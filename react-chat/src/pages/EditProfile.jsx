import { HeaderEditProfile } from '../components/widgets/HeaderEditProfile/HeaderEditProfile';
import { SectionEditProfile } from '../components/widgets/SectionEditProfile/SectionEditProfile';
import { useCurrentUser } from '../utils/API/hooks';

export function EditProfile() {
  const { currentUser } = useCurrentUser();

  return (
    <>
      <HeaderEditProfile navigateLink="/chatlist" />
      <main className="main">
        <SectionEditProfile currentUser={currentUser} />
      </main>
    </>
  );
}
