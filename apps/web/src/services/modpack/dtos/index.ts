import type { DModpack, DModpackMember, DUser } from '@org/database/schemas'

export interface IModpackDTO extends DModpack {
  members?: DModpackMember[]
}

export type IModpackMemberDTO = DModpackMember

export interface IMemberDTO extends DModpackMember {
  user: Pick<DUser, 'id' | 'name' | 'email' | 'image'>
}
