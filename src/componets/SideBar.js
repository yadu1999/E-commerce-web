import {  BsFilter } from "react-icons/bs";

import { useTranslation } from "react-i18next";
const SideBar = ({ categories, filterP, setAllCategory }) => {
  const { t } = useTranslation();

  console.log(categories, 'categories')

  return (
    <div className="flex justify-start max-[676px]:invisible font-['Cairo'] text-medium">
      <aside className="w-52 absolute mt-6">
        <div className="px-0 py-6 overflow-y-auto rounded bg-gray-50 dark:bg-gray-800">
          <ul className="space-y-2">
            <li>
              <button onClick={setAllCategory} className="flex items-center text-base text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
                <BsFilter size={24} />
                <span className="ml-2">{t("All Products")}</span>
              </button>
            </li>
            {categories.map((category) => (
              <li key={category}>
                <button onClick={() => filterP(category)} className="flex items-center text-base text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
                  <span className="flex-1 ml-3">{t(category)}</span>
                </button>
              </li>
            ))}
          </ul>
        </div>
      </aside>
    </div>
  );
};

export default SideBar;




