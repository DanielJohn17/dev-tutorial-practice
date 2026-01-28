import { Injectable } from '@nestjs/common';

import { randomUUID } from 'node:crypto';
import { CreateProfileDto } from './dto/creat-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';

@Injectable()
export class ProfilesService {
  private profiles = [
    { id: randomUUID(), name: 'Daniel', description: 'Test 1 description' },
    { id: randomUUID(), name: 'Jon Doe', description: 'Test 2 description' },
    { id: randomUUID(), name: 'Jane', description: 'test 3 description' },
    { id: randomUUID(), name: 'Jasper', description: 'test 4 description' },
  ];

  findAll() {
    return this.profiles;
  }

  findOne(id: string) {
    return this.profiles.find((profile) => profile.id === id);
  }

  create(createProfileDto: CreateProfileDto) {
    const profile = {
      id: randomUUID(),
      ...createProfileDto,
    };

    this.profiles.push(profile);

    return profile;
  }

  update(id: string, updateProfileDto: UpdateProfileDto) {
    const matchingProfile = this.profiles.find((profile) => profile.id === id);

    if (!matchingProfile) {
      return {};
    }

    matchingProfile.name = updateProfileDto.name;
    matchingProfile.description = updateProfileDto.description;

    return matchingProfile;
  }

  remove(id: string) {
    const matchingProfile = this.profiles.findIndex(
      (profile) => profile.id === id,
    );

    if (matchingProfile > -1) {
      this.profiles.splice(matchingProfile, 1);
    }
  }
}
