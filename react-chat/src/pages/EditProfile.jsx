import { HeaderEditProfile } from '../components/widgets/HeaderEditProfile/HeaderEditProfile';
import { SectionEditProfile } from '../components/widgets/SectionEditProfile/SectionEditProfile';

export function EditProfile() {
  return (
    <>
      <HeaderEditProfile navigateLink="/chatlist" />
      <main className="main">
        <SectionEditProfile />
      </main>
    </>
  );
}
