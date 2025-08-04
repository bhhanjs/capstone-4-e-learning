# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default tseslint.config([
  globalIgnores(["dist"]),
  {
    files: ["**/*.{ts,tsx}"],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      ...tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      ...tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      ...tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ["./tsconfig.node.json", "./tsconfig.app.json"],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
]);
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from "eslint-plugin-react-x";
import reactDom from "eslint-plugin-react-dom";

export default tseslint.config([
  globalIgnores(["dist"]),
  {
    files: ["**/*.{ts,tsx}"],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs["recommended-typescript"],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ["./tsconfig.node.json", "./tsconfig.app.json"],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
]);
```

# CAPSTONE: E-LEARNING

- https://www.udemy.com/
- https://elearningnew.cybersoft.edu.vn/swagger/index.html

## Project description

1. USER
   a. Trang chủ

- Link: "/"
- Call 2 API

* api : /api/QuanLyKhoaHoc/LayDanhMucKhoaHoc => tạo navlink
* api : /api/QuanLyKhoaHoc/LayDanhSachKhoaHoc => lấy 8 khoá học đầu tiên

b. Trang Danh mục khoá học

- link: "/danh-muc-khoa-hoc?maDanhMuc=(maDanhMuc)&maNhom=CPXX"
- Page loading nhận tham số từ URL (MaDanhMuc)
- Call 2 API

* api : /api/QuanLyKhoaHoc/LayKhoaHocTheoDanhMuc
* api : /api/QuanLyKhoaHoc/ThemKhoaHoc => dùng api cho nút đăng ký khoá học trên từng khoá học to ridect qua trang chi tiết kèm theo tham số makhoahoc

c. Trang Chi tiết khoa học

- link: "/chi-tiet/{maKhoaHoc}"
- Page load dua vao tham so lay tu URL goi api: /api/QuanLyKhoaHoc/LayThongTinKhoaHoc

d. Trang Tìm kiêms khoá học

- link: "/tim-kiem-khoa-hoc/tenKhoaHoc={}"
- Get data search of the user and re-direct to the search page
- Call api: /api/QuanLyKhoaHoc/LayDanhSachKhoaHoc
- Click on khoa hoc card - redirect to the chi tiet page

e. Trang register

- link: "/register"
- Call api: /api/QuanLyNguoiDung/DangKy

f. Trang login

- link: "/login"
- Call api: /api/QuanLyNguoiDung/DangNhap
- Store user data and token in the local storage

g. Thông tin cá nhân

- link: "thong-tin-tai-khoan"
- Call 2 apis:

* Call api: /api/QuanLyNguoiDung/ThongTinNguoiDung => Get user data base on the account store in localStorage
* Call api: /api/QuanLyNguoiDung/CapNhatThongTinNguoiDung => for user to update data

h. khoá học đã ghi danh

- link: "khoa-hoc-cua-toi"
- Call 2 apis:

* Call api: /api/QuanLyNguoiDung/LayDanhSachKhoaHocDaXetDuyet => to get the list registed courses
* Call api: /api/QuanLyKhoaHoc/HuyGhiDanh => to cancel the registeed course

2. ADMIN
   a. Quản lý khoá học: Thêm - xoá - sửa
   b. Quản lý ngườ dùng: Thêm - xoá - sửa

## Folder structure

1. apis: API calls

2. assets: images

3. components:
   a. ui: tạo bởi shadcn for shadcn components installed
   b. shared: components được tạo ra để tái sửu dụng trong project
   c. layouts: for the layouts

4. constants: lưu trữ static variables

- config.js
- role.js

5. hooks: custom hooks

6. lib: tạo bởi shadcn

7. pages: lưu trữ trang

8. routes: lưu trữ đường dẫn

- elements.jsx
- paths.js

9. store: redux store

- slices folder
- store file

10. utils: functions tái sử dụng

## CSS:
1. Color
+ Fresh Off-White (background)
+ Clean Charcoal (text)
+ Soft Mint Green (accents, buttons)
+ Bright Sage (hover, highlights, icons)
+ Soft Peach (hightlight, alert)
