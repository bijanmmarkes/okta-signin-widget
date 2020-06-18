import { loc } from 'okta';
export default {
  title () {
    if(this.options.appState.getCurrentViewState().name === 'enroll-factor') {
      return loc('email.enroll.title', 'login');
    } else {
      return loc('oie.email.mfa.title', 'login');
    }
  }
};
