function Header() {
  return (
    <div className="flex justify-around">
      <div className="font-bold text-[18pt]">ViZone</div>

      <nav className="flex gap-4">
        <div>Home</div>
        <div>Login</div>
        <div>Signup</div>
      </nav>
    </div>
  );
}

export default Header;
