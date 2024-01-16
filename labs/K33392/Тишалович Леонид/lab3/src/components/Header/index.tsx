import style from "./Header.module.sass";
import { useState, useEffect } from "react";
import lightTheme from "../../assets/lightTheme.png";
import darkTheme from "../../assets/darkTheme.png";
import { Icon } from "../index";
import { useNavigate } from "react-router-dom";

type HeaderProps = {
  setSelectedGender: (gender: string) => void;
  onSearch?: (query: string) => void;
};

export const Header = ({ setSelectedGender, onSearch }: HeaderProps) => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [theme, setTheme] = useState<string>("light");
  const [icon, setIcon] = useState(lightTheme);
  const navigate = useNavigate();

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
    setIcon((prevIcon) => (prevIcon === lightTheme ? darkTheme : lightTheme));
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);

    if (onSearch) {
      onSearch(e.target.value);
    }
  };

  const handleGenderClick = (gender: string) => {
    setSelectedGender(gender);
  };

  const handleCartIconClick = () => {
    navigate("/cart");
  };

  return (
    <header className={style.wrapper}>
      <div
        className={style.logoWrapper}
        onClick={() => handleGenderClick("all")}
      >
        <Icon id="Euphoria" />
      </div>
      <nav className={style.categories}>
        <button onClick={() => handleGenderClick("male")}>Men</button>
        <button onClick={() => handleGenderClick("female")}>Women</button>
      </nav>
      <input
        placeholder="Search"
        value={searchQuery}
        onChange={handleSearchChange}
      />
      <div className={style.headerBtns}>
        <button className={style.bookmarkBtn}>
          <Icon id="Heart" />
        </button>
        <button className={style.profileBtn}>
          <Icon id="User" />
        </button>
        <button className={style.cartBtn}>
          <div onClick={handleCartIconClick}>
            <Icon id="Cart" />
          </div>
        </button>
        <button onClick={toggleTheme} className={style.themeBtn}>
          <img className={style.themeImg} alt="Лого темы" src={icon} />
        </button>
      </div>
    </header>
  );
};
