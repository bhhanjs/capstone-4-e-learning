import MediumScreen from "./medium-screen";
import SmallScreen from "./small-screen";

export default function Header() {
  return (
    <header className="header border-b shadow-sm bg-white">
      <div className="header__container md:container mx-auto">
        {/* md screen */}
        <div className="hidden md:flex items-center justify-between px-6 py-4">
          <MediumScreen />
        </div>

        {/* small screen */}
        <div className="flex md:hidden items-center justify-between px-4 py-3">
          <SmallScreen />
        </div>
      </div>
    </header>
  );
}
