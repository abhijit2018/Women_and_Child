import { useState, useEffect } from 'react';
import type { ChangeEvent, FormEvent } from 'react';
import FormHeader from '../../components/FormHeader/FormHeader';
import Footer from '../../components/Footer/Footer';
import Button from '../../components/Button/Button';
import { validateField, sanitizeText } from '../../utils/validators';
import type { FieldRules } from '../../utils/validators';
import './RegisterForm.css';
import Header from '../../components/Header/Header';
import NavBar from '../../components/NavBar/NavBar';

interface FormValues {
  fullName: string;
  address: string;
  pincode: string;
  email: string;
  phone: string;
  category: string;
  preferredDate: string;
  details: string;
  consent: boolean;
}

type FormStatus = 'idle' | 'submitting' | 'success' | 'error';

const initialValues: FormValues = {
  fullName: '',
  address: '',
  pincode: '',
  email: '',
  phone: '',
  category: '',
  preferredDate: '',
  details: '',
  consent: false,
};

const fieldRules: Partial<Record<keyof FormValues, FieldRules>> = {
  fullName: { required: true, maxLength: 100 },
  email: { required: true, email: true },
  phone: { required: true, phone: true },
  category: { required: true },
  details: { required: true, maxLength: 1000 },
};

function RegisterForm() {
  const [values, setValues] = useState<FormValues>(initialValues);
  const [errors, setErrors] = useState<Partial<Record<keyof FormValues, string>>>({});
  const [status, setStatus] = useState<FormStatus>('idle');
  const [captcha, setCaptcha] = useState('');
  const [captchaInput, setCaptchaInput] = useState('');
  const [captchaError, setCaptchaError] = useState('');
  const [isCaptchaValid, setIsCaptchaValid] = useState(false);

function generateCaptcha() {
  const chars =
    "ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz23456789";

  let code = "";

  for (let i = 0; i < 6; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length));
  }

  setCaptcha(code);
  setCaptchaInput("");
  setIsCaptchaValid(false);
}

useEffect(() => {
  generateCaptcha();
}, []);

  function handleChange(e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    const fieldName = name as keyof FormValues;
    setValues((prev) => ({ ...prev, [fieldName]: type === 'checkbox' ? checked : value }));
    if (errors[fieldName]) {
      setErrors((prev) => ({ ...prev, [fieldName]: '' }));
    }
  }

  function validateAll(): Partial<Record<keyof FormValues, string>> {
    const nextErrors: Partial<Record<keyof FormValues, string>> = {};
    (Object.entries(fieldRules) as [keyof FormValues, FieldRules][]).forEach(([name, rules]) => {
      const message = validateField(name, String(values[name] ?? ''), rules);
      if (message) nextErrors[name] = message;
    });
    if (!values.consent) {
      nextErrors.consent = 'Please confirm before submitting.';
    }
    return nextErrors;
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const nextErrors = validateAll();
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    setStatus('submitting');
    try {
      // Wire this up to apiClient.post('/support-requests', payload)
      // once the backend endpoint exists. Sanitizing text fields here
      // is defense-in-depth only — the server must validate again.
      const payload = {
        ...values,
        fullName: sanitizeText(values.fullName),
        details: sanitizeText(values.details),
      };
      await new Promise((resolve) => setTimeout(resolve, 600)); // placeholder
      console.info('Form ready to submit:', payload);
      setStatus('success');
    } catch {
      setStatus('error');
    }
  }

  if (status === 'success') {
    return (
      <>
        <FormHeader formName="Request Submitted" />
        <main className="form-page">
          <div className="container form-page__success">
            <h2>Thank you — we&apos;ve received your request.</h2>
            <p>
              A member of our support team will reach out through your preferred
              contact method. If this is urgent, please use the 24×7 helpline
              in the footer below.
            </p>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      {/* <FormHeader formName="Request Support" /> */}
       <Header />
    <NavBar />
      <main className="form-page">
         <div className="form-page__header container">
      <p>
       Complaints Registration Form
      </p>
    </div>
        <div className="container">
          {/* <form className="form-card" onSubmit={handleSubmit} noValidate>
            <p className="form-card__intro">
              Fields below are placeholders — tell me the real field set and
              I&apos;ll swap these in with the same styling and validation.
            </p>

            <div className="form-field">
              <label htmlFor="fullName">Full name</label>
              <input
                id="fullName"
                name="fullName"
                type="text"
                autoComplete="name"
                value={values.fullName}
                onChange={handleChange}
                aria-invalid={Boolean(errors.fullName)}
                aria-describedby={errors.fullName ? 'fullName-error' : undefined}
              />
              {errors.fullName && (
                <span id="fullName-error" className="form-field__error">{errors.fullName}</span>
              )}
            </div>

            <div className="form-field-row">
              <div className="form-field">
                <label htmlFor="email">Email address</label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  value={values.email}
                  onChange={handleChange}
                  aria-invalid={Boolean(errors.email)}
                  aria-describedby={errors.email ? 'email-error' : undefined}
                />
                {errors.email && (
                  <span id="email-error" className="form-field__error">{errors.email}</span>
                )}
              </div>

              <div className="form-field">
                <label htmlFor="phone">Phone number</label>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  autoComplete="tel"
                  value={values.phone}
                  onChange={handleChange}
                  aria-invalid={Boolean(errors.phone)}
                  aria-describedby={errors.phone ? 'phone-error' : undefined}
                />
                {errors.phone && (
                  <span id="phone-error" className="form-field__error">{errors.phone}</span>
                )}
              </div>
            </div>

            <div className="form-field-row">
              <div className="form-field">
                <label htmlFor="category">Reason for contact</label>
                <select
                  id="category"
                  name="category"
                  value={values.category}
                  onChange={handleChange}
                  aria-invalid={Boolean(errors.category)}
                >
                  <option value="">Select an option</option>
                  <option value="report">Report a concern</option>
                  <option value="guidance">Request guidance</option>
                  <option value="followup">Follow up on an existing case</option>
                  <option value="other">Other</option>
                </select>
                {errors.category && (
                  <span className="form-field__error">{errors.category}</span>
                )}
              </div>

              <div className="form-field">
                <label htmlFor="preferredDate">Preferred callback date</label>
                <input
                  id="preferredDate"
                  name="preferredDate"
                  type="date"
                  value={values.preferredDate}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="form-field">
              <label htmlFor="details">Tell us more</label>
              <textarea
                id="details"
                name="details"
                rows={5}
                value={values.details}
                onChange={handleChange}
                aria-invalid={Boolean(errors.details)}
                aria-describedby={errors.details ? 'details-error' : undefined}
              />
              {errors.details && (
                <span id="details-error" className="form-field__error">{errors.details}</span>
              )}
            </div>

            <label className="form-checkbox">
              <input
                type="checkbox"
                name="consent"
                checked={values.consent}
                onChange={handleChange}
              />
              <span>I understand this information will be handled confidentially.</span>
            </label>
            {errors.consent && <span className="form-field__error">{errors.consent}</span>}

            <Button type="submit" variant="primary" size="lg" fullWidth>
              {status === 'submitting' ? 'Submitting…' : 'Submit Request'}
            </Button>

            {status === 'error' && (
              <p className="form-card__error" role="alert">
                Something went wrong. Please try again in a moment.
              </p>
            )}
          </form> */}
          <form className="form-card" onSubmit={handleSubmit}>

  {/* SECTION 1 */}

  <div className="form-section">

    <div className="section-title">
      <span>1.</span>
      <span>Details of Complainant / অভিযোগকারীর বিবরণ :</span>
    </div>

    <div className="form-grid">

      <div className="form-field">
        <label>
          1.1 Name / নাম <span>*</span>
        </label>

        <input
          type="text"
          name="fullName"
          placeholder="Name of Complainant / অভিযোগকারীর নাম"
          value={values.fullName}
          onChange={handleChange}
        />
      </div>

      <div className="form-field">
        <label>
          1.2  Address / ঠিকানা <span>*</span>
        </label>

         <input
          type="text"
          name="address"
          placeholder="Address of Complainant/ অভিযোগকারীর ঠিকানা"
          value={values.address}
          onChange={handleChange}
        />
      </div>

     <div className="form-field">
  <label>
    1.3 State / রাজ্য <span>*</span>
  </label>

  <select
    name="state"
    defaultValue=""
  >
    <option value="" disabled>
      Select State / রাজ্য নির্বাচন করুন
    </option>

    <option value="West Bengal">West Bengal</option>
    <option value="Bihar">Bihar</option>
    <option value="Jharkhand">Jharkhand</option>
    <option value="Odisha">Odisha</option>
    <option value="Assam">Assam</option>
  </select>
</div>

<div className="form-field">
  <label>
    1.4 District / জেলা <span>*</span>
  </label>

  <select
    name="district"
    defaultValue=""
  >
    <option value="" disabled>
      Select District / জেলা নির্বাচন করুন
    </option>

    <option value="Kolkata">Kolkata</option>
    <option value="Howrah">Howrah</option>
    <option value="North 24 Parganas">North 24 Parganas</option>
    <option value="South 24 Parganas">South 24 Parganas</option>
    <option value="Hooghly">Hooghly</option>
  </select>
</div>

      <div className="form-field">
        <label>
          1.5 Pincode / পিন কোড <span>*</span>
        </label>

       <input
          type="text"
          name="pincode"
          placeholder="Pincode of Complainant/অভিযোগকারীর পিন কোড"
          value={values.pincode}
          onChange={handleChange}
        />
      </div>
       
        <div className="form-field">
        <label>
          1.6 Email / ই-মেইল <span>*</span>
        </label>

       <input
          type="text"
          name="email"
          placeholder="Email of Complainant / অভিযোগকারীর ই-মেইল"
          value={values.email}
          onChange={handleChange}
        />
      </div>

       <div className="form-field">
        <label>
          1.7 Mobile No. / মোবাইল নম্বর <span>*</span>
        </label>

       <input
          type="text"
          name="phno"
          placeholder="Mobile No. of Complainant/অভিযোগকারীর মোবাইল নম্বর"
          value={values.phno}
          onChange={handleChange}
        />
      </div>

 <div className="form-field">
  <label>
    1.8 Gender / লিঙ্গ <span>*</span>
  </label>

  <select name="gender">
    <option value="">Select Gender / লিঙ্গ নির্বাচন করুন</option>
    <option value="male">Male / পুরুষ</option>
    <option value="female">Female / মহিলা</option>
    <option value="transgender">Transgender / তৃতীয় লিঙ্গ</option>
    <option value="other">Other / অন্যান্য</option>
  </select>
</div>
    </div>

  </div>

   {/* SECTION 2 */}

  <div className="form-section">

    <div className="section-title">
      <span>2.</span>
      <span>Details of Victim / ভুক্তভোগীর বিবরণ :</span>
    </div>

    <div className="form-grid">

   <div className="form-field full-width">

  <div className="radio-row">
    <label className="radio-question">
      2.1 Whether the complainant is the victim? / অভিযোগকারী কি ভুক্তভোগী? <span>*</span>
    </label>

    <div className="radio-group">
      <label className="radio-option">
        <input
          type="radio"
          name="isVictim"
          value="yes"
          checked={values.isVictim === "yes"}
          onChange={handleChange}
        />
        <span>Yes / হ্যাঁ</span>
      </label>

      <label className="radio-option">
        <input
          type="radio"
          name="isVictim"
          value="no"
          checked={values.isVictim === "no"}
          onChange={handleChange}
        />
        <span>No / না</span>
      </label>
    </div>
  </div>

</div>

      <div className="form-field">
        <label>
          2.2 Name / নাম <span>*</span>
        </label>

        <input
          type="text"
          name="fullName"
          placeholder="Name of Victim / ভুক্তভোগীর নাম"
          value={values.fullName}
          onChange={handleChange}
        />
      </div>

      <div className="form-field">
        <label>
          2.3  Address / ঠিকানা <span>*</span>
        </label>

         <input
          type="text"
          name="address"
          placeholder="Address of Victim/ ভুক্তভোগীর ঠিকানা"
          value={values.address}
          onChange={handleChange}
        />
      </div>

      <div className="form-field">
  <label>
    2.4 State / রাজ্য <span>*</span>
  </label>

  <select
    name="state"
    defaultValue=""
  >
    <option value="" disabled>
      Select State / রাজ্য নির্বাচন করুন
    </option>

    <option value="West Bengal">West Bengal</option>
    <option value="Bihar">Bihar</option>
    <option value="Jharkhand">Jharkhand</option>
    <option value="Odisha">Odisha</option>
    <option value="Assam">Assam</option>
  </select>
</div>

<div className="form-field">
  <label>
    2.5 District / জেলা <span>*</span>
  </label>

  <select
    name="district"
    defaultValue=""
  >
    <option value="" disabled>
      Select District / জেলা নির্বাচন করুন
    </option>

    <option value="Kolkata">Kolkata</option>
    <option value="Howrah">Howrah</option>
    <option value="North 24 Parganas">North 24 Parganas</option>
    <option value="South 24 Parganas">South 24 Parganas</option>
    <option value="Hooghly">Hooghly</option>
  </select>
</div>

 <div className="form-field">
        <label>
          2.6 Pincode / পিন কোড <span>*</span>
        </label>

       <input
          type="text"
          name="pincode"
          placeholder="Pincode of Victim/ভুক্তভোগীর পিন কোড"
          value={values.pincode}
          onChange={handleChange}
        />
      </div>
       
        <div className="form-field">
        <label>
          2.7 Email / ই-মেইল <span>*</span>
        </label>

       <input
          type="text"
          name="email"
          placeholder="Email of Victim / ভুক্তভোগীর ই-মেইল"
          value={values.email}
          onChange={handleChange}
        />
      </div>

       <div className="form-field">
        <label>
          2.8 Mobile No. / মোবাইল নম্বর <span>*</span>
        </label>

       <input
          type="text"
          name="phno"
          placeholder="Mobile No. of Victim/ভুক্তভোগীর মোবাইল নম্বর"
          value={values.phno}
          onChange={handleChange}
        />
      </div>

       <div className="form-field">
  <label>
    2.9 Gender / লিঙ্গ <span>*</span>
  </label>

  <select name="gender">
    <option value="">Select Gender / লিঙ্গ নির্বাচন করুন</option>
    <option value="male">Male / পুরুষ</option>
    <option value="female">Female / মহিলা</option>
    <option value="transgender">Transgender / তৃতীয় লিঙ্গ</option>
    <option value="other">Other / অন্যান্য</option>
  </select>
</div>

<div className="form-field">
  <label>
    2.10 Date of Birth / জন্ম তারিখ <span>*</span>
  </label>

  <input
    type="date"
    name="dob"
  />
</div>

<div className="form-field">
  <label>
    2.11 Caste / জাতি <span>*</span>
  </label>

  <select name="caste">
    <option value="">Select Caste / জাতি নির্বাচন করুন</option>
    <option value="General">General / সাধারণ</option>
    <option value="SC">SC / তফসিলি জাতি</option>
    <option value="ST">ST / তফসিলি উপজাতি</option>
    <option value="OBC">OBC / অন্যান্য অনগ্রসর শ্রেণি</option>
    <option value="EWS">EWS / অর্থনৈতিকভাবে দুর্বল শ্রেণি</option>
    <option value="Other">Other / অন্যান্য</option>
  </select>
</div>

<div className="form-field">
  <label>
    2.12 Whether Differently Abled / ভিন্নভাবে সক্ষম?<span>*</span>
  </label>

  <select name="differentlyAbled">
    <option value="">
      Select Option / নির্বাচন করুন
    </option>

    <option value="Not Applicable">
      Not Applicable / প্রযোজ্য নয়
    </option>

    <option value="Physical Disability">
      Physical Disability / শারীরিক প্রতিবন্ধিতা
    </option>

    <option value="Mental Disability">
      Mental Disability / মানসিক প্রতিবন্ধিতা
    </option>

    <option value="Multiple Disability">
      Multiple Disability / একাধিক প্রতিবন্ধিতা
    </option>

    <option value="Other">
      Other / অন্যান্য
    </option>
  </select>
</div>

    </div>

  </div>

    {/* SECTION 3 */}

<div className="form-section">

  <div className="section-title">
    <span>3.</span>
    <span>Details of the Incident / ঘটনার বিবরণ</span>
  </div>

  <div className="form-grid">

    {/* Date of Incident */}
    <div className="form-field">
      <label>
        3.1 Date of Incident / ঘটনার তারিখ <span>*</span>
      </label>

      <input
        type="date"
        name="incidentDate"
      />
    </div>

    {/* Time of Incident */}
    <div className="form-field">
      <label>
        3.2 Time of Incident / ঘটনার সময় <span>*</span>
      </label>

      <input
        type="time"
        name="incidentTime"
      />
    </div>

    {/* Full Details */}
    <div className="form-field full-width">
      <label>
        3.3 Full Details of the Incident / ঘটনার সম্পূর্ণ বিবরণ <span>*</span>
      </label>

      <textarea
        name="incidentDetails"
        rows={6}
        placeholder="Describe the incident in detail / ঘটনার সম্পূর্ণ বিবরণ লিখুন"
      />
    </div>

  </div>

</div>

{/* Declaration */}

<div className="form-bottom">

  <label className="form-checkbox">
    <input
      type="checkbox"
      name="consent"
      checked={values.consent}
      onChange={handleChange}
    />

    <span>
      I hereby declare that the information furnished above is true to the best
      of my knowledge.
      <br />
      আমি এই মর্মে ঘোষণা করছি যে, উপরোক্ত প্রদত্ত তথ্য আমার জ্ঞান ও বিশ্বাস
      অনুযায়ী সত্য।
    </span>
  </label>

  {errors.consent && (
    <span className="form-field__error">
      {errors.consent}
    </span>
  )}

  {/* CAPTCHA */}

<div className="captcha-container">

  <label className="captcha-label">
    Please enter the text exactly as shown in the box.
    <span>*</span>
    <br />
    <small>বক্সে প্রদর্শিত লেখাটি হুবহু লিখুন।</small>
  </label>

  <div className="captcha-row">

    <div className="captcha-code">
      {captcha}
    </div>

    <button
      type="button"
      className="captcha-refresh"
      onClick={generateCaptcha}
    >
      ↻
    </button>

    <input
  type="text"
  placeholder="Enter CAPTCHA"
  value={captchaInput}
  onChange={(e) => {
    const value = e.target.value;
    setCaptchaInput(value);

    if (value.trim() === captcha) {
      setIsCaptchaValid(true);
      setCaptchaError("");
    } else {
      setIsCaptchaValid(false);
    }
  }}
/>

  </div>

  {captchaError && (
    <span className="form-field__error">
      {captchaError}
    </span>
  )}

</div>

  {/* Submit */}

  <div className="form-submit">
    <Button
      type="submit"
      variant="primary"
      size="lg"
    >
      Submit Complaint
    </Button>
  </div>

</div>

</form>
        </div>
      </main>
      <Footer />
    </>
  );
}

export default RegisterForm;
