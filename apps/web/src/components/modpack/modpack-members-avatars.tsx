import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@org/design-system/components/ui/avatar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuPositioner,
  DropdownMenuTrigger,
} from '@org/design-system/components/ui/dropdown-menu'
import {
  CircleNotchIcon,
  UserPlusIcon,
} from '@org/design-system/components/ui/icons'
import { useModpackMembers } from '@/hooks/modpack'
import type { ModpackMemberWithUser } from '@/services/modpack/get-members.service'
import { getInitials } from '@/utils/string'
import { RemoveMemberDialog } from './remove-member-dialog'

interface ModpackMembersAvatarsProps {
  modpackId: string
  onAddMember?: () => void
}

export function ModpackMembersAvatars({
  modpackId,
  onAddMember,
}: ModpackMembersAvatarsProps) {
  const { data: members, isLoading } = useModpackMembers(modpackId)

  if (isLoading) {
    return (
      <div className="flex items-center gap-2">
        <CircleNotchIcon className="h-4 w-4 animate-spin" weight="bold" />
        <span className="text-sm text-muted-foreground">
          Loading members...
        </span>
      </div>
    )
  }

  if (!members || members.length === 0) {
    return (
      <div className="flex items-center gap-2">
        <span className="text-sm text-muted-foreground">No members yet</span>
        {onAddMember && (
          <button
            type="button"
            onClick={onAddMember}
            className="flex items-center gap-1 text-sm text-primary hover:underline"
          >
            <UserPlusIcon className="h-4 w-4" weight="bold" />
            Add member
          </button>
        )}
      </div>
    )
  }

  const visibleMembers = members.slice(0, 5)
  const remainingCount = members.length - 5

  return (
    <div className="flex items-center -space-x-2">
      {visibleMembers.map((member) => (
        <MemberAvatar key={member.id} member={member} />
      ))}

      {remainingCount > 0 && (
        <DropdownMenu>
          <DropdownMenuTrigger
            render={
              <button
                type="button"
                className="relative inline-flex h-10 w-10 items-center justify-center rounded-full border-2 border-background bg-muted hover:bg-muted/80 transition-colors"
              >
                <span className="text-xs font-medium">+{remainingCount}</span>
              </button>
            }
          />
          <DropdownMenuPositioner align="end">
            <DropdownMenuContent className="w-64">
              <div className="px-2 py-1.5 text-sm font-semibold">
                All Members ({members.length})
              </div>
              {members.slice(5).map((member) => (
                <DropdownMenuItem
                  key={member.id}
                  className="flex items-center gap-3 p-2"
                >
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={member.user.image || undefined} />
                    <AvatarFallback>
                      {getInitials(member.user.name || member.user.email)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">
                      {member.user.name || member.user.email}
                    </p>
                    {member.user.name && (
                      <p className="text-xs text-muted-foreground truncate">
                        {member.user.email}
                      </p>
                    )}
                  </div>
                  <RemoveMemberDialog modpackId={modpackId} member={member} />
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenuPositioner>
        </DropdownMenu>
      )}

      {onAddMember && (
        <button
          type="button"
          onClick={onAddMember}
          className="relative inline-flex h-10 w-10 items-center justify-center rounded-full border-2 border-dashed border-muted-foreground/25 hover:border-muted-foreground/50 hover:bg-muted/50 transition-colors ml-2"
          title="Add member"
        >
          <UserPlusIcon
            className="h-4 w-4 text-muted-foreground"
            weight="bold"
          />
        </button>
      )}
    </div>
  )
}

interface MemberAvatarProps {
  member: ModpackMemberWithUser
}

function MemberAvatar({ member }: MemberAvatarProps) {
  return (
    <div className="group relative">
      <Avatar className="h-10 w-10 border-2 border-background hover:z-10 transition-all">
        <AvatarImage src={member.user.image || undefined} />
        <AvatarFallback>
          {getInitials(member.user.name || member.user.email)}
        </AvatarFallback>
      </Avatar>
      <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-popover text-popover-foreground text-xs rounded shadow-md opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-50">
        {member.user.name || member.user.email}
      </div>
    </div>
  )
}
