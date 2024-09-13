export const LoadingSpin = ({
  text = "로딩중",
  spinColor1 = "#DCDBDD",
  spinColor2 = "#656C7A",
  widthClass = "w-6",
  heightClass = "h-6",
  bgColorClass,
}: {
  text?: string;
  spinColor1?: string;
  spinColor2?: string;

  widthClass?: string;
  heightClass?: string;
  bgColorClass: string;
}) => (
  <div className="p-5">
    <div className="flex gap-2 justify-center">
      <div className="font-bold text-xl text-textBlue">{text}</div>
      <div>
        <div
          className={`animate-spin ${widthClass} ${heightClass} rounded-full flex justify-center items-center`}
          style={{
            backgroundImage: `conic-gradient(${spinColor1} 0deg 160deg, ${spinColor2} 160deg 360deg)`,
          }}
        >
          <div className={`w-[50%] h-[50%] rounded-full ${bgColorClass}`}></div>
        </div>
      </div>
    </div>
  </div>
);
