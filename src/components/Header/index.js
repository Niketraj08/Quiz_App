import React, { useState, useEffect } from 'react';
import { Menu, Button } from 'semantic-ui-react';

const Header = () => {
  const [promptEvent, setPromptEvent] = useState(null);
  const [appAccepted, setAppAccepted] = useState(false);

  // detect if app is already installed (standalone mode) or user has accepted
  const isStandalone = typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(display-mode: standalone)').matches;
  const isAppInstalled = isStandalone || appAccepted;

  useEffect(() => {
    // Handler for the beforeinstallprompt event
    const beforeInstallPromptHandler = e => {
      // Prevent the automatic prompt
      e.preventDefault();
      // Stash the event so it can be triggered later.
      setPromptEvent(e);
    };

    // Handler when the app is installed
    const appInstalledHandler = () => {
      setAppAccepted(true);
      setPromptEvent(null);
      console.log('PWA was installed');
    };

    window.addEventListener('beforeinstallprompt', beforeInstallPromptHandler);
    window.addEventListener('appinstalled', appInstalledHandler);

    return () => {
      window.removeEventListener('beforeinstallprompt', beforeInstallPromptHandler);
      window.removeEventListener('appinstalled', appInstalledHandler);
    };
  }, []);

  const installApp = () => {
    if (!promptEvent) return;
    // Show the browser install prompt
    promptEvent.prompt();
    // Wait for the user's response to the prompt
    promptEvent.userChoice.then(result => {
      if (result.outcome === 'accepted') {
        setAppAccepted(true);
        console.log('User accepted the A2HS prompt');
      } else {
        console.log('User dismissed the A2HS prompt');
      }
      // Clear the saved prompt since it can only be used once
      setPromptEvent(null);
    });
  };

  return (
    <Menu stackable inverted>
      <Menu.Item header>
        <h1>QuizApp</h1>
      </Menu.Item>
      {promptEvent && !isAppInstalled && (
        <Menu.Item position="right">
          <Button
            color="teal"
            icon="download"
            labelPosition="left"
            content="Install App"
            onClick={installApp}
          />
        </Menu.Item>
      )}
    </Menu>
  );
};

export default Header;
