import * as React from 'react';
import { cloneElement, forwardRef, useLayoutEffect, useState } from 'react';
import * as R from 'ramda';
import { ChildrenType } from './types';
import styled from 'styled-components';
import {
    createNewChildrenContainers,
    getChildKey, calculateWrapperHeight,
    hasSomeChildWrongTopAttribute,
    recalculateTopAttribute, updateSingleContainer,
    isSomeChildMoving,
    areAllChildrenAtRightIndex,
} from './utils';
import { ChildWrapper } from './ChildWrapper';
import { useFirstRenderEffect } from '@agora/basic-hooks';

export type Props = {
    className?: string;
    childWrapperClassName?: string;
    children?: ChildrenType[];
};

const Wrapper = styled.div<{
    $height: number
    $isFirstRender: boolean
}>`
    position: relative;
    transition: height ${props => (props.$isFirstRender ? 0 : props.theme.transitionDuration)}s ease;
    height: ${props => props.$height}px;
`;


export const AnimatedRows = forwardRef<HTMLDivElement | null, Props>((props, forwardedRef) => {
    const { children = [], className } = props;
    if (!Array.isArray(children)) throw new Error(`Children of AnimatedRows must be array`);

    const isFirstRender = useFirstRenderEffect();
    const [shownChildren, setShownChildren] = useState(createNewChildrenContainers(children));

    useLayoutEffect(() => {
        if (!hasSomeChildWrongTopAttribute(shownChildren)) return;
        setShownChildren(currentChildren => recalculateTopAttribute(currentChildren));
    }, [shownChildren]);

    const wrapperHeight = calculateWrapperHeight(shownChildren);

    const shownKeys = new Set(shownChildren.map((child) => child.key));
    const newKeys = new Set(children.map(getChildKey));
    const childrenToRemove = shownChildren.filter((child) => !newKeys.has(child.key));
    const isActivelyRemoving = childrenToRemove.length > 0;
    const isActivelyMoving = isSomeChildMoving(shownChildren);

    // move children if we are not removing any child
    if (!isActivelyRemoving) {
        const childrenToAdd = children.filter(child => !shownKeys.has(getChildKey(child)));
        const thereAreChildrenToMove = !areAllChildrenAtRightIndex(shownChildren, children);

        if (childrenToAdd.length > 0 || thereAreChildrenToMove) {
            setShownChildren(shownChildren => {
                const existingContainers = R.indexBy(R.prop('key'), shownChildren);
                return children.map(child => {
                    const key = getChildKey(child);
                    return existingContainers[key] ?? {
                        ...createNewChildrenContainers([child])[0],
                        isAdding: true,
                    };
                });
            });
        }
    }

    return (
        <Wrapper className={className} $height={wrapperHeight} $isFirstRender={isFirstRender} ref={forwardedRef}>
            {shownChildren.map((childContainer, index) => {
                const isRemovingCurrentElement = childrenToRemove.includes(childContainer);
                const isAddingCurrentElement = childContainer.isAdding;
                const actualChildren = children.find(ch => {
                    return ch.key === childContainer.key
                }) ?? childContainer.child;

                return <ChildWrapper
                    className={props.childWrapperClassName}
                    key={`${index}-${childContainer.key}`}
                    fromTop={childContainer.expectedFromTop}
                    child={cloneElement(actualChildren, {
                        key: undefined,
                    })}
                    isParentFirstRender={isFirstRender}
                    isRemoving={isRemovingCurrentElement}
                    isAdding={isAddingCurrentElement}
                    // if we are adding this element, but we are still moving some other element,
                    // we don't want to show it. We will show it when all the existing elements
                    // are at their position.
                    isShown={!(isAddingCurrentElement && isActivelyMoving)}

                    onNewHeight={height => setShownChildren(
                        updateSingleContainer(childContainer.key, child => ({
                            ...child,
                            height,
                        })),
                    )}
                    whenRemoved={() => setShownChildren(
                        children => children.filter(child => child.key !== childContainer.key),
                    )}
                    whenAdded={() => setShownChildren(
                        updateSingleContainer(childContainer.key, child => ({
                            ...child,
                            isAdding: false,
                        })),
                    )}
                    onMove={value => setShownChildren(
                        updateSingleContainer(childContainer.key, child => ({
                            ...child,
                            actualFromTop: value,
                        })),
                    )}
                />;
            },
            )}
        </Wrapper>
    );
});