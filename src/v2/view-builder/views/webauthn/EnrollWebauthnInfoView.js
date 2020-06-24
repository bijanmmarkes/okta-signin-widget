import { loc, View, createCallout } from 'okta';
import BrowserFeatures from 'util/BrowserFeatures';
import hbs from 'handlebars-inline-precompile';

export default View.extend({
  // eslint-disable-next-line max-len
  template: hbs`<p class="idx-webauthn-enroll-text">{{i18n code="oie.enroll.webauthn.instructions" bundle="login"}}</p>`,
  initialize () {
    const activationData = this.options.appState.get('currentAuthenticator').contextualData.activationData;
    if (BrowserFeatures.isEdge()) {
      this.add(View.extend({
        template: hbs`
          <p class="idx-webauthn-enroll-text-edge">
            {{i18n code="oie.enroll.webauthn.instructions.edge" bundle="login"}}
          </p>`
      }));
    }
    if (activationData.authenticatorSelection.userVerification === 'required') {
      this.add(createCallout({
        className: 'uv-required-callout',
        size: 'slim',
        type: 'warning',
        subtitle: loc('oie.enroll.webauthn.uv.required.instructions', 'login'),
      }));
    }
    this.add(View.extend({
      template: hbs`<div data-se="webauthn-waiting" class="okta-waiting-spinner"></div>`
    }));
  },
});
