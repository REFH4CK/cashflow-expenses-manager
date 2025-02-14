import { Routes, Route } from "react-router";
import { Landing } from "@/pages/Landing";
import { Login } from '@/pages/App/Login/Login'
import { Register } from "@/pages/App/Login/Register";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </>
  );
}

export default App;
