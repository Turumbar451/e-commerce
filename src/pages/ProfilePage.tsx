import { Navbar } from "@/components/common/Navbar";
import { UserProfile } from "@/features/user/UserProfile";

const ProfilePage = () => {
  return (
    <div className="flex flex-col min-h-screen">
      
      <Navbar />

      <main className="grow flex items-center justify-center p-4">
        
        <div className="w-full max-w-md">
          
          <UserProfile />

        </div>
      </main>

    </div>
  );
};

export default ProfilePage;