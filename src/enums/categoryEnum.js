const CategoryEnum = {
    ESSENTIALS: "Essentials",
    LIFESTYLE: "Lifestyle",
    FINANCIAL_COMMITMENTS: "Financial Commitments",
    EDUCATION_AND_CHILDCARE: "Education & Childcare",
    OCCASIONS_AND_TRAVEL: "Occasions & Travel",
    MISCELLANEOUS: "Miscellaneous",
};

const CategoryColors = {
    [CategoryEnum.ESSENTIALS]: "rgb(255, 0, 255)", // Magenta
    [CategoryEnum.LIFESTYLE]: "rgb(54, 162, 235)", // Blue
    [CategoryEnum.FINANCIAL_COMMITMENTS]: "rgb(255, 165, 0)", // Orange
    [CategoryEnum.EDUCATION_AND_CHILDCARE]: "rgb(0, 255, 0)", // Green
    [CategoryEnum.OCCASIONS_AND_TRAVEL]: "rgb(255, 0, 0)", // Red
    [CategoryEnum.MISCELLANEOUS]: "rgb(255, 255, 0)", // Yellow
};

const CategoryArray = Object.values(CategoryEnum);

module.exports = { CategoryEnum, CategoryArray, CategoryColors };

