import {
  ForestOutlined,
  ListAltOutlined,
  Inventory2Outlined,
  PaymentsOutlined,
  FolderSharedOutlined,
  ChevronLeft,
  ChevronRightOutlined,
  HomeOutlined,
} from "@mui/icons-material";

export const navItems = [
  {
    text: "Dashboard",
    icon: <HomeOutlined />,
  },
  {
    text: "Pengelola Kebun",
    icon: null,
  },
  {
    text: "Kebun",
    icon: <ForestOutlined />,
  },
  {
    text: "Tugas",
    icon: <ListAltOutlined />,
  },

  {
    text: "Manajemen",
    icon: null,
  },
  {
    text: "Inventaris",
    icon: <Inventory2Outlined />,
  },
  {
    text: "Keuangan",
    icon: <PaymentsOutlined />,
  },

  {
    text: "Admin",
    icon: null,
  },
  {
    text: "Kelola Akun",
    icon: <FolderSharedOutlined />,
  },
];
