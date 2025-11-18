<<<<<<< HEAD
// src/pages/ProfilePage.tsx
import { Navbar } from "@/components/common/Navbar";
import { UserProfile } from "@/features/user/UserProfile";
import { UserAddresses } from "@/features/user/UserAddresses"; // <-- TU NOMBRE DE ARCHIVO
=======
import { Navbar } from "@/components/common/Navbar";
import { UserProfile } from "@/features/user/UserProfile";
>>>>>>> main

const ProfilePage = () => {
  return (
    <div className="flex flex-col min-h-screen">
      
      <Navbar />

      <main className="grow flex items-center justify-center p-4">
        
        <div className="w-full max-w-md">
          
          <UserProfile />

<<<<<<< HEAD
          <UserAddresses />

=======
>>>>>>> main
        </div>
      </main>

    </div>
  );
};

export default ProfilePage;