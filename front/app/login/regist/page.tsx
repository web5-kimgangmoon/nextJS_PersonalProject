import { BottomLink } from "@/app/ui/login/footer";
import { Regist } from "@/app/ui/login/regist/regist";

export default function Page() {
  return (
    <div>
      <Regist />
      <BottomLink isLoginPage={false} />
    </div>
  );
}
