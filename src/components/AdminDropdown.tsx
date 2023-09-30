import {
  Menu,
  MenuItem,
} from '@mui/material';

export interface AdminDropdownProps {
  open: boolean;
  isAdmin: boolean;
  items: DropdownItem[];
  onClose: () => void;
};

export type DropdownItem = {
  text: string;
  path: string;
  requiresAuth?: boolean;
};

export const AdminDropdown = (props: any) => {
  const { open, isAdmin, items, onClose } = props;

  if (!isAdmin) {
    return null;
  }

  return (
    <Menu
      id="admin-menu"
      anchorEl={open}
      open={Boolean(open)}
      onClose={onClose}
      PaperProps={{
        elevation: 0,
        sx: {
          overflow: 'visible',
          filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
          mt: 1.5,
          '& .MuiAvatar-root': {
            width: 32,
            height: 32,
            ml: -0.5,
            mr: 1,
          },
          '&:before': {
            content: '""',
            display: 'block',
            position: 'absolute',
            top: 0,
            right: 14,
            width: 10,
            height: 10,
            bgcolor: 'background.paper',
            transform: 'translateY(-50%) rotate(45deg)',
            zIndex: 0,
          },
        },
      }}
      transformOrigin={{ horizontal: 'right', vertical: 'top' }}
      anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
    >
      {items.map((item: DropdownItem) => (
        <MenuItem
          key={item.path}
          component="a"
          href={item.path}
          onClick={onClose}
        >
          {item.text}
        </MenuItem>
      ))}
    </Menu>
  );
};