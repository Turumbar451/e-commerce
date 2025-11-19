<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> 8c34dcea0a629afaea65840db0d17034cb192f14
// src/pages/ProfilePage.tsx
import { Navbar } from "@/components/common/Navbar";
import { UserProfile } from "@/features/user/UserProfile";
import { UserAddresses } from "@/features/user/UserAddresses"; // <-- TU NOMBRE DE ARCHIVO
<<<<<<< HEAD
=======
import { Navbar } from "@/components/common/Navbar";
import { UserProfile } from "@/features/user/UserProfile";
>>>>>>> main
=======
>>>>>>> 8c34dcea0a629afaea65840db0d17034cb192f14

const ProfilePage = () => {
  return (
    <div className="flex flex-col min-h-screen">
      
      <Navbar />

      <main className="grow flex items-center justify-center p-4">
        
        <div className="w-full max-w-md">
          
          <UserProfile />

<<<<<<< HEAD
<<<<<<< HEAD
          <UserAddresses />

=======
>>>>>>> main
=======
          <UserAddresses />

>>>>>>> 8c34dcea0a629afaea65840db0d17034cb192f14
        </div>
      </main>

    </div>
  );
};

export default ProfilePage;