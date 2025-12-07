import { addMemberController } from './add-member'
import { archiveModpackController } from './archive'
import { createModpackController } from './create'
import { listPublicModpacksController } from './list'
import { listMembersController } from './list-members'
import { listMyModpacksController } from './list-my'
import { removeMemberController } from './remove-member'
import { updateModpackController } from './update'

export const modpackController = {
  create: createModpackController,
  update: updateModpackController,
  archive: archiveModpackController,
  listPublic: listPublicModpacksController,
  listMy: listMyModpacksController,
  addMember: addMemberController,
  removeMember: removeMemberController,
  listMembers: listMembersController,
}
