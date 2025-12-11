import { addModpackMemberService } from './add-member.service'
import { getModpackMembersService } from './get-members.service'
import { removeModpackMemberService } from './remove-member.service'

export const MembersService = {
  get: getModpackMembersService,
  add: addModpackMemberService,
  remove: removeModpackMemberService,
}
