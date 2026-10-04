import ProfileApp from './apps/ProfileApp.jsx';
import FilesApp from './apps/FilesApp.jsx';
import DesktopAppLayout from './apps/DesktopAppLayout.jsx';
import { APPS } from './appsConfig.js';

const MainContainer = () => {
    return (
        <>
            <DesktopAppLayout AppId={APPS.PROFILE.id} AppName={APPS.PROFILE.name} AppComponent={<ProfileApp />} />
            <DesktopAppLayout AppId={APPS.FILES.id} AppName={APPS.FILES.name} AppComponent={<FilesApp />} />
        </>
    );
};

export default MainContainer;
