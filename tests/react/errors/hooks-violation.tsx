// @expect-errors: react-hooks/rules-of-hooks
import React, { useState } from 'react';

function ConditionalHook(): React.ReactElement {
    if (Math.random() > 0.5) {
        const [value] = useState(0);
        return <div>{value}</div>;
    }
    return <div>no</div>;
}

export { ConditionalHook };
