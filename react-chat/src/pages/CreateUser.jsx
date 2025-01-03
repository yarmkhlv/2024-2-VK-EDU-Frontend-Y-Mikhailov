import { HeaderEditProfile } from '../components/widgets/HeaderEditProfile/HeaderEditProfile';

import { SectionCreateUser } from '../components/widgets/SectionCreateUser/SectionCreateUser';

export function CreateUser() {
  return (
    <>
      <HeaderEditProfile title="Создание пользователя" navigateLink="/" />
      <main className="main">
        <SectionCreateUser />
      </main>
    </>
  );
}
