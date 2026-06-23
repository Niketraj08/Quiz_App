import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Container,
  Segment,
  Item,
  Button,
  Form,
  Message,
  Divider,
} from 'semantic-ui-react';

const Settings = ({ onBackToHome }) => {
  const [theme, setTheme] = useState('light');
  const [notifications, setNotifications] = useState(true);
  const [saved, setSaved] = useState(false);

  const handleSaveSettings = () => {
    // Save settings logic here
    localStorage.setItem('appSettings', JSON.stringify({
      theme,
      notifications,
    }));
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <Container>
      <Segment>
        <Item.Group>
          <Item>
            <Item.Content>
              <Item.Header>
                <h1>⚙️ Settings</h1>
              </Item.Header>
              {saved && (
                <Message success>
                  <Message.Header>Success!</Message.Header>
                  Your settings have been saved.
                </Message>
              )}
              <Divider />
              <Item.Meta>
                <Form>
                  <Form.Group>
                    <Form.Field>
                      <label>Theme</label>
                      <select
                        value={theme}
                        onChange={(e) => setTheme(e.target.value)}
                      >
                        <option value="light">Light Mode</option>
                        <option value="dark">Dark Mode</option>
                      </select>
                    </Form.Field>
                  </Form.Group>

                  <Form.Group>
                    <Form.Field>
                      <label>
                        <input
                          type="checkbox"
                          checked={notifications}
                          onChange={(e) => setNotifications(e.target.checked)}
                        />
                        Enable Notifications
                      </label>
                    </Form.Field>
                  </Form.Group>
                </Form>
              </Item.Meta>
              <Divider />
              <Item.Extra>
                <Button
                  primary
                  size="big"
                  content="Save Settings"
                  onClick={handleSaveSettings}
                />
                <Button
                  secondary
                  size="big"
                  content="Back to Home"
                  onClick={onBackToHome}
                />
              </Item.Extra>
            </Item.Content>
          </Item>
        </Item.Group>
      </Segment>
    </Container>
  );
};

Settings.propTypes = {
  onBackToHome: PropTypes.func.isRequired,
};

export default Settings;