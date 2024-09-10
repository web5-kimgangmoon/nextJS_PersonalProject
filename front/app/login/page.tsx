import { BottomLink } from "@/app/ui/login/footer";
import { Login } from "@/app/ui/login/login";

export default function () {
  return (
    <div>
      <BottomLink isLoginPage={true} />
      <Login />
    </div>
  );
}
