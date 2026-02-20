import { Injectable } from '@nestjs/common';
import { SocialWallRepository } from '../repositories/socialWall.repository';
import { CreateSocialWallDto,   UpdateSocialWallDto } from '../endpoints/socialWall/socialWall.dto';
import { Prisma, SocialWall } from '../prisma';
import { InvitationRepository } from "../repositories";
import {
     SocialWallNotFoundError,NotWallOwnerError,SocialWallSlugExistsError,
     EmptyPayloadError,
    } from '../endpoints/errors';

@Injectable()
export class SocialWallLogic {
    constructor(
        private readonly socialWallRepository: SocialWallRepository,
        private readonly invitationRepository: InvitationRepository,
    ) {}

    async bySlugUnchecked(slug: string): Promise<SocialWall | null> {
        return this.socialWallRepository.bySlug(slug)
    }

    async bySlug(slug: string, userId?: string): Promise<SocialWall> {
        const wall = await this.bySlugUnchecked(slug);
        if (!wall) throw new SocialWallNotFoundError();

        if (wall.isPublic) return wall;

        if (!userId) throw new SocialWallNotFoundError();


        if (wall.creatorId !== userId) {
            const invitation = await this.invitationRepository.checkForWall(userId, wall.id);
            if (!invitation)
                throw new SocialWallNotFoundError();

        }
        return wall
    }

    async create(creatorId: string, dto: CreateSocialWallDto): Promise<SocialWall> {
        try {
            return await this.socialWallRepository.create(creatorId, dto);
        } catch (error) {
            if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P2002")
                throw new SocialWallSlugExistsError();

            throw error;
        }
    }

    async update(callingUserId: string, slug: string, dto: UpdateSocialWallDto): Promise<SocialWall> {
        if (Object.values(dto).every(value => value === undefined))
            throw new EmptyPayloadError();

        const wall = await this.socialWallRepository.bySlug(slug);
        if (!wall)
            throw new SocialWallNotFoundError();

        if (wall.creatorId !== callingUserId)
            throw new NotWallOwnerError();

        return this.socialWallRepository.update(slug, dto);
    }

    async delete(callingUserId: string,   slug: string):   Promise<void> {
        const wall = await this.socialWallRepository.bySlug(slug);
        if (!wall)
            throw new SocialWallNotFoundError();

        if (wall.creatorId !== callingUserId)
            throw new NotWallOwnerError();

        await this.socialWallRepository.delete(slug);
    }

    async getNewest(userId?: string): Promise<SocialWall[]> {
        const walls = await this.socialWallRepository.getNewest(userId);
        return walls;
    }

    async getMostPopular(userId?: string): Promise<SocialWall[]> {
        return this.socialWallRepository.getMostPopular(userId);
    }

    async getMine(userId: string): Promise<SocialWall[]> {
        return this.socialWallRepository.getMine(userId)
    }

    async search(query: string, userId?: string): Promise<SocialWall[]> {
        return this.socialWallRepository.search(query, userId);
    }
}