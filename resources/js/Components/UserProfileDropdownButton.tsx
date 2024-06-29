import { Avatar, AvatarFallback, AvatarImage } from "@/Components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/Components/ui/dropdown-menu";
interface UserProfileDropdownButtonProps {
  avatar: string;
  avatarFallback: string;
  children: React.ReactNode;
}
export function UserProfileDropdownButton({
  avatar,
  avatarFallback,
  children,
}: UserProfileDropdownButtonProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Avatar className="size-10">
          <AvatarImage src={avatar} alt="User profile picture" />
          <AvatarFallback className="text-sm font-bold">{avatarFallback}</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent>{children}</DropdownMenuContent>
    </DropdownMenu>
  );
}
