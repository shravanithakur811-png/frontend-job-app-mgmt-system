function Navbar() {
  const logout = () => {
    localStorage.clear();
    window.location.reload();
  };

  return (
    <nav className="navbar navbar-dark bg-dark px-3">
      <h4 className="text-white">Job Portal</h4>
      <button className="btn btn-danger" onClick={logout}>
        Logout
      </button>
    </nav>
  );
}

export default Navbar;