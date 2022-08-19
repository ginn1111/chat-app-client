const MenuIcon = ({ isClose, onClick }) => {
  return (
    <div className={`w-[25px] h-[20px] relative menu-icon cursor-pointer ${isClose ? 'close' : ''}`} onClick={onClick}></div>
  )
}

export default MenuIcon;
