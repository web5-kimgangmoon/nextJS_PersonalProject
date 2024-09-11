import { BottomLink } from "@/app/ui/login/footer";
import { Login } from "@/app/ui/login/login";

export default function Page() {
  return (
    <div>
      <Login />
      <BottomLink isLoginPage={true} />
    </div>
  );
}
