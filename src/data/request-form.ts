/** Field definitions shared by the form, the browser validation and the server schema. Nothing else is collected. */
export const TEAM_SIZES = ['Solo', '2–5', '6–15', '16+'] as const;

export const FIELDS = {
  name: { label: 'Name', max: 120, required: true, autocomplete: 'name', error: 'Enter your name.' },
  email: { label: 'Work email', max: 200, required: true, autocomplete: 'email', error: 'Enter a valid email address, like name@brokerage.com.' },
  company: { label: 'Team or brokerage', max: 160, required: true, autocomplete: 'organization', error: 'Enter your team or brokerage name.' },
  market: { label: 'Market or neighborhoods', max: 300, required: true, autocomplete: 'off', error: 'Tell us the market or neighborhoods you work.' },
  teamSize: { label: 'Team size', max: 8, required: true, autocomplete: 'off', error: 'Choose a team size.' },
  note: { label: 'Note (optional)', max: 2000, required: false, autocomplete: 'off', error: 'Keep the note under 2,000 characters.' },
} as const;

export type FieldName = keyof typeof FIELDS;
/** Hidden field that people never see or fill. */
export const HONEYPOT = 'website';
