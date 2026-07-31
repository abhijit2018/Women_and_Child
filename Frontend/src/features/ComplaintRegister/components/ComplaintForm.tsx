
import { useState, useEffect } from 'react';
import type { ChangeEvent, FormEvent } from 'react';
import Button from '../../../components/ui/Button/Button';
import { validateField, sanitizeText } from '../utils/complaintHelpers';
import type { FieldRules } from '../utils/complaintHelpers';
import "../../../styles/RegisterForm.css";

interface FormValues {
  // Section 1 — Complainant
  complainantName: string;
  complainantAddress: string;
  complainantDistrict: string;
  complainantPS: string;
  complainantPincode: string;
  complainantEmail: string;
  complainantPhone: string;
  complainantGender: string;

  // Section 2 — Victim
  isVictim: string; // 'yes' | 'no' | ''
  victimName: string;
  victimAddress: string;
  victimDistrict: string;
  victimPS: string;
  victimPincode: string;
  victimEmail: string;
  victimPhone: string;
  victimGender: string;
  victimDob: string;
  victimCaste: string;
  victimDifferentlyAbled: string;

  // Section 3 — Incident
  incidentDate: string;
  incidentTime: string;
  placeOfOccurrence: string;
  incidentDetails: string;

  // Declaration
  consent: boolean;
}

type FormStatus = 'idle' | 'submitting' | 'success' | 'error';

const initialValues: FormValues = {
  complainantName: '',
  complainantAddress: '',
  complainantDistrict: '',
  complainantPS: '',
  complainantPincode: '',
  complainantEmail: '',
  complainantPhone: '',
  complainantGender: '',

  isVictim: '',
  victimName: '',
  victimAddress: '',
  victimDistrict: '',
  victimPS: '',
  victimPincode: '',
  victimEmail: '',
  victimPhone: '',
  victimGender: '',
  victimDob: '',
  victimCaste: '',
  victimDifferentlyAbled: '',

  incidentDate: '',
  incidentTime: '',
  placeOfOccurrence: '',
  incidentDetails: '',

  consent: false,
};

const fieldRules: Partial<Record<keyof FormValues, FieldRules>> = {
  complainantName: { required: true, maxLength: 150 },
  complainantAddress: { required: true, maxLength: 300 },
  complainantDistrict: { required: true },
  complainantPS: { required: true },
  complainantPincode: { required: true, maxLength: 10 },
  complainantEmail: { required: true, email: true },
  complainantPhone: { required: true, phone: true },
  complainantGender: { required: true },

  isVictim: { required: true },
  victimName: { required: true, maxLength: 150 },
  victimAddress: { required: true, maxLength: 300 },
  victimDistrict: { required: true },
  victimPS: { required: true },
  victimPincode: { required: true, maxLength: 10 },
  victimEmail: { required: true, email: true },
  victimPhone: { required: true, phone: true },
  victimGender: { required: true },
  victimDob: { required: true },
  victimCaste: { required: true },
  victimDifferentlyAbled: { required: true },

  incidentDate: { required: true },
  incidentTime: { required: true },
  placeOfOccurrence: { required: true, maxLength: 200 },
  incidentDetails: { required: true, maxLength: 3000 },
};

const VICTIM_FIELDS_LINKED_TO_COMPLAINANT: Array<{
  victim: keyof FormValues;
  complainant: keyof FormValues;
}> = [
  { victim: 'victimName', complainant: 'complainantName' },
  { victim: 'victimAddress', complainant: 'complainantAddress' },
  { victim: 'victimDistrict', complainant: 'complainantDistrict' },
  { victim: 'victimPS', complainant: 'complainantPS' },
  { victim: 'victimPincode', complainant: 'complainantPincode' },
  { victim: 'victimEmail', complainant: 'complainantEmail' },
  { victim: 'victimPhone', complainant: 'complainantPhone' },
  { victim: 'victimGender', complainant: 'complainantGender' },
];

function RegisterForm() {

  const [values, setValues] = useState<FormValues>(initialValues);
  const [errors, setErrors] = useState<Partial<Record<keyof FormValues, string>>>({});
  const [status, setStatus] = useState<FormStatus>('idle');
  const [captcha, setCaptcha] = useState('');
  const [captchaInput, setCaptchaInput] = useState('');
  const [captchaError, setCaptchaError] = useState('');
  const [isCaptchaValid, setIsCaptchaValid] = useState(false);

  function generateCaptcha() {
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz23456789';
    let code = '';
    for (let i = 0; i < 6; i++) {
      code += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setCaptcha(code);
    setCaptchaInput('');
    setIsCaptchaValid(false);
  }

  useEffect(() => {
    generateCaptcha();
  }, []);

  useEffect(() => {
    if (status === 'error') {
      generateCaptcha();
    }
  }, [status]);

  function handleCaptchaInputChange(e: ChangeEvent<HTMLInputElement>) {
    const value = e.target.value;
    setCaptchaInput(value);

    if (value.trim() === captcha) {
      setIsCaptchaValid(true);
      setCaptchaError('');
    } else {
      setIsCaptchaValid(false);
      setCaptchaError(value.trim().length > 0 ? 'Incorrect CAPTCHA. Please try again. / ভুল ক্যাপচা। আবার চেষ্টা করুন।' : '');
    }
  }

  function handleIsVictimChange(nextValue: 'yes' | 'no') {
    setValues((prev) => {
      const next = { ...prev, isVictim: nextValue };
      VICTIM_FIELDS_LINKED_TO_COMPLAINANT.forEach(({ victim, complainant }) => {
        (next[victim] as string) = nextValue === 'yes' ? (prev[complainant] as string) : '';
      });
      return next;
    });

    setErrors((prev) => {
      const next = { ...prev, isVictim: '' };
      VICTIM_FIELDS_LINKED_TO_COMPLAINANT.forEach(({ victim }) => {
        next[victim] = '';
      });
      return next;
    });
  }

  function handleChange(e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    const fieldName = name as keyof FormValues;

    if (fieldName === 'isVictim') {
      handleIsVictimChange(value as 'yes' | 'no');
      return;
    }

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

  const isSubmitDisabled = !values.consent || !isCaptchaValid;

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!isCaptchaValid) {
      setCaptchaError('Please enter the CAPTCHA exactly as shown.');
      return;
    }
    setCaptchaError('');

    const nextErrors = validateAll();
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    setStatus('submitting');
    try {
      const payload = {
        ...values,
        complainantName: sanitizeText(values.complainantName),
        complainantAddress: sanitizeText(values.complainantAddress),
        victimName: sanitizeText(values.victimName),
        victimAddress: sanitizeText(values.victimAddress),
        incidentDetails: sanitizeText(values.incidentDetails),
      };
      await new Promise((resolve) => setTimeout(resolve, 600)); 
      console.info('Form ready to submit:', payload);
      setStatus('success');
    } catch {
      setStatus('error');
    }
  }

  // if (status === 'success') {
  //   return (
  //     <>
  //       <FormHeader formName="Request Submitted" />
  //       <main className="form-page">
  //         <div className="container form-page__success">
  //           <h2>Thank you — we&apos;ve received your request.</h2>
  //           <p>
  //             A member of our support team will reach out through your preferred
  //             contact method. If this is urgent, please use the 24×7 helpline
  //             in the footer below.
  //           </p>
  //         </div>
  //       </main>
  //       <Footer />
  //     </>
  //   );
  // }

  return (
    <>


      <main className="form-page">
        <div className="form-page__header container">
          <p>Complaints Registration Form</p>
        </div>

        <div className="container">
          <form className="form-card" onSubmit={handleSubmit}>

            {/* SECTION 1 — Complainant */}

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
                    name="complainantName"
                    placeholder="Name of Complainant / অভিযোগকারীর নাম"
                    value={values.complainantName}
                    onChange={handleChange}
                  />
                  {errors.complainantName && (
                    <span className="form-field__error">{errors.complainantName}</span>
                  )}
                </div>

                <div className="form-field">
                  <label>
                    1.2 Address / ঠিকানা <span>*</span>
                  </label>
                  <input
                    type="text"
                    name="complainantAddress"
                    placeholder="Address of Complainant/ অভিযোগকারীর ঠিকানা"
                    value={values.complainantAddress}
                    onChange={handleChange}
                  />
                  {errors.complainantAddress && (
                    <span className="form-field__error">{errors.complainantAddress}</span>
                  )}
                </div>

                <div className="form-field">
                  <label>
                    1.3 District / জেলা <span>*</span>
                  </label>
                  <select
                    name="complainantDistrict"
                    value={values.complainantDistrict}
                    onChange={handleChange}
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
                  {errors.complainantDistrict && (
                    <span className="form-field__error">{errors.complainantDistrict}</span>
                  )}
                </div>

                <div className="form-field">
                  <label>
                    1.4 Police Station / থানা <span>*</span>
                  </label>
                  <select
                    name="complainantPS"
                    value={values.complainantPS}
                    onChange={handleChange}
                  >
                    <option value="" disabled>
                      Select Police Station / থানা নির্বাচন করুন
                    </option>
                    <option value="West Bengal">West Bengal</option>
                    <option value="Bihar">Bihar</option>
                    <option value="Jharkhand">Jharkhand</option>
                    <option value="Odisha">Odisha</option>
                    <option value="Assam">Assam</option>
                  </select>
                  {errors.complainantPS && (
                    <span className="form-field__error">{errors.complainantPS}</span>
                  )}
                </div>

                <div className="form-field">
                  <label>
                    1.5 Pincode / পিন কোড <span>*</span>
                  </label>
                  <input
                    type="text"
                    name="complainantPincode"
                    placeholder="Pincode of Complainant/অভিযোগকারীর পিন কোড"
                    value={values.complainantPincode}
                    onChange={handleChange}
                  />
                  {errors.complainantPincode && (
                    <span className="form-field__error">{errors.complainantPincode}</span>
                  )}
                </div>

                <div className="form-field">
                  <label>
                    1.6 Email / ই-মেইল <span>*</span>
                  </label>
                  <input
                    type="text"
                    name="complainantEmail"
                    placeholder="Email of Complainant / অভিযোগকারীর ই-মেইল"
                    value={values.complainantEmail}
                    onChange={handleChange}
                  />
                  {errors.complainantEmail && (
                    <span className="form-field__error">{errors.complainantEmail}</span>
                  )}
                </div>

                <div className="form-field">
                  <label>
                    1.7 Mobile No. / মোবাইল নম্বর <span>*</span>
                  </label>
                  <input
                    type="text"
                    name="complainantPhone"
                    placeholder="Mobile No. of Complainant/অভিযোগকারীর মোবাইল নম্বর"
                    value={values.complainantPhone}
                    onChange={handleChange}
                  />
                  {errors.complainantPhone && (
                    <span className="form-field__error">{errors.complainantPhone}</span>
                  )}
                </div>

                <div className="form-field">
                  <label>
                    1.8 Gender / লিঙ্গ <span>*</span>
                  </label>
                  <select
                    name="complainantGender"
                    value={values.complainantGender}
                    onChange={handleChange}
                  >
                    <option value="">Select Gender / লিঙ্গ নির্বাচন করুন</option>
                    <option value="male">Male / পুরুষ</option>
                    <option value="female">Female / মহিলা</option>
                    <option value="transgender">Transgender / তৃতীয় লিঙ্গ</option>
                    <option value="other">Other / অন্যান্য</option>
                  </select>
                  {errors.complainantGender && (
                    <span className="form-field__error">{errors.complainantGender}</span>
                  )}
                </div>
              </div>
            </div>

            {/* SECTION 2 — Victim */}

            <div className="form-section">
              <div className="section-title">
                <span>2.</span>
                <span>Details of Victim / ভুক্তভোগীর বিবরণ :</span>
              </div>

              <div className="form-grid">
                <div className="form-field full-width">
                  <div className="radio-row">
                    <label className="radio-question">
                      2.1 Whether the complainant is the victim? / অভিযোগকারী কি ভুক্তভোগী?{' '}
                      <span>*</span>
                    </label>

                    <div className="radio-group">
                      <label className="radio-option">
                        <input
                          type="radio"
                          name="isVictim"
                          value="yes"
                          checked={values.isVictim === 'yes'}
                          onChange={handleChange}
                        />
                        <span>Yes / হ্যাঁ</span>
                      </label>

                      <label className="radio-option">
                        <input
                          type="radio"
                          name="isVictim"
                          value="no"
                          checked={values.isVictim === 'no'}
                          onChange={handleChange}
                        />
                        <span>No / না</span>
                      </label>
                    </div>
                  </div>
                  {errors.isVictim && <span className="form-field__error">{errors.isVictim}</span>}
                </div>

                <div className="form-field">
                  <label>
                    2.2 Name / নাম <span>*</span>
                  </label>
                  <input
                    type="text"
                    name="victimName"
                    placeholder="Name of Victim / ভুক্তভোগীর নাম"
                    value={values.victimName}
                    onChange={handleChange}
                  />
                  {errors.victimName && (
                    <span className="form-field__error">{errors.victimName}</span>
                  )}
                </div>

                <div className="form-field">
                  <label>
                    2.3 Address / ঠিকানা <span>*</span>
                  </label>
                  <input
                    type="text"
                    name="victimAddress"
                    placeholder="Address of Victim/ ভুক্তভোগীর ঠিকানা"
                    value={values.victimAddress}
                    onChange={handleChange}
                  />
                  {errors.victimAddress && (
                    <span className="form-field__error">{errors.victimAddress}</span>
                  )}
                </div>

                <div className="form-field">
                  <label>
                    2.4 District / জেলা <span>*</span>
                  </label>
                  <select
                    name="victimDistrict"
                    value={values.victimDistrict}
                    onChange={handleChange}
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
                  {errors.victimDistrict && (
                    <span className="form-field__error">{errors.victimDistrict}</span>
                  )}
                </div>

                <div className="form-field">
                  <label>
                    2.5 Police Station / থানা <span>*</span>
                  </label>
                  <select
                    name="victimPS"
                    value={values.victimPS}
                    onChange={handleChange}
                  >
                    <option value="" disabled>
                      Select Police Station / থানা নির্বাচন করুন
                    </option>
                    <option value="West Bengal">West Bengal</option>
                    <option value="Bihar">Bihar</option>
                    <option value="Jharkhand">Jharkhand</option>
                    <option value="Odisha">Odisha</option>
                    <option value="Assam">Assam</option>
                  </select>
                  {errors.victimPS && (
                    <span className="form-field__error">{errors.victimPS}</span>
                  )}
                </div>

                <div className="form-field">
                  <label>
                    2.6 Pincode / পিন কোড <span>*</span>
                  </label>
                  <input
                    type="text"
                    name="victimPincode"
                    placeholder="Pincode of Victim/ভুক্তভোগীর পিন কোড"
                    value={values.victimPincode}
                    onChange={handleChange}
                  />
                  {errors.victimPincode && (
                    <span className="form-field__error">{errors.victimPincode}</span>
                  )}
                </div>

                <div className="form-field">
                  <label>
                    2.7 Email / ই-মেইল <span>*</span>
                  </label>
                  <input
                    type="text"
                    name="victimEmail"
                    placeholder="Email of Victim / ভুক্তভোগীর ই-মেইল"
                    value={values.victimEmail}
                    onChange={handleChange}
                  />
                  {errors.victimEmail && (
                    <span className="form-field__error">{errors.victimEmail}</span>
                  )}
                </div>

                <div className="form-field">
                  <label>
                    2.8 Mobile No. / মোবাইল নম্বর <span>*</span>
                  </label>
                  <input
                    type="text"
                    name="victimPhone"
                    placeholder="Mobile No. of Victim/ভুক্তভোগীর মোবাইল নম্বর"
                    value={values.victimPhone}
                    onChange={handleChange}
                  />
                  {errors.victimPhone && (
                    <span className="form-field__error">{errors.victimPhone}</span>
                  )}
                </div>

                <div className="form-field">
                  <label>
                    2.9 Gender / লিঙ্গ <span>*</span>
                  </label>
                  <select
                    name="victimGender"
                    value={values.victimGender}
                    onChange={handleChange}
                  >
                    <option value="">Select Gender / লিঙ্গ নির্বাচন করুন</option>
                    <option value="male">Male / পুরুষ</option>
                    <option value="female">Female / মহিলা</option>
                    <option value="transgender">Transgender / তৃতীয় লিঙ্গ</option>
                    <option value="other">Other / অন্যান্য</option>
                  </select>
                  {errors.victimGender && (
                    <span className="form-field__error">{errors.victimGender}</span>
                  )}
                </div>

                <div className="form-field">
                  <label>
                    2.10 Date of Birth / জন্ম তারিখ <span>*</span>
                  </label>
                  <input
                    type="date"
                    name="victimDob"
                    value={values.victimDob}
                    onChange={handleChange}
                  />
                  {errors.victimDob && (
                    <span className="form-field__error">{errors.victimDob}</span>
                  )}
                </div>

                <div className="form-field">
                  <label>
                    2.11 Caste / জাতি <span>*</span>
                  </label>
                  <select
                    name="victimCaste"
                    value={values.victimCaste}
                    onChange={handleChange}
                  >
                    <option value="">Select Caste / জাতি নির্বাচন করুন</option>
                    <option value="General">General / সাধারণ</option>
                    <option value="SC">SC / তফসিলি জাতি</option>
                    <option value="ST">ST / তফসিলি উপজাতি</option>
                    <option value="OBC">OBC / অন্যান্য অনগ্রসর শ্রেণি</option>
                    <option value="EWS">EWS / অর্থনৈতিকভাবে দুর্বল শ্রেণি</option>
                    <option value="Other">Other / অন্যান্য</option>
                  </select>
                  {errors.victimCaste && (
                    <span className="form-field__error">{errors.victimCaste}</span>
                  )}
                </div>

                <div className="form-field">
                  <label>
                    2.12 Whether Differently Abled / ভিন্নভাবে সক্ষম? <span>*</span>
                  </label>
                  <select
                    name="victimDifferentlyAbled"
                    value={values.victimDifferentlyAbled}
                    onChange={handleChange}
                  >
                    <option value="">Select Option / নির্বাচন করুন</option>
                    <option value="Not Applicable">Not Applicable / প্রযোজ্য নয়</option>
                    <option value="Physical Disability">
                      Physical Disability / শারীরিক প্রতিবন্ধিতা
                    </option>
                    <option value="Mental Disability">
                      Mental Disability / মানসিক প্রতিবন্ধিতা
                    </option>
                    <option value="Multiple Disability">
                      Multiple Disability / একাধিক প্রতিবন্ধিতা
                    </option>
                    <option value="Other">Other / অন্যান্য</option>
                  </select>
                  {errors.victimDifferentlyAbled && (
                    <span className="form-field__error">{errors.victimDifferentlyAbled}</span>
                  )}
                </div>
              </div>
            </div>

            {/* SECTION 3 — Incident */}

            <div className="form-section">
              <div className="section-title">
                <span>3.</span>
                <span>Details of the Incident / ঘটনার বিবরণ :</span>
              </div>

              <div className="form-grid">
                <div className="form-field">
                  <label>
                    3.1 Date of Incident / ঘটনার তারিখ <span>*</span>
                  </label>
                  <input
                    type="date"
                    name="incidentDate"
                    value={values.incidentDate}
                    onChange={handleChange}
                  />
                  {errors.incidentDate && (
                    <span className="form-field__error">{errors.incidentDate}</span>
                  )}
                </div>

                <div className="form-field">
                  <label>
                    3.2 Time of Incident / ঘটনার সময় <span>*</span>
                  </label>
                  <input
                    type="time"
                    name="incidentTime"
                    value={values.incidentTime}
                    onChange={handleChange}
                  />
                  {errors.incidentTime && (
                    <span className="form-field__error">{errors.incidentTime}</span>
                  )}
                </div>

                <div className="form-field">
                  <label>
                    3.3 Place of Occurrence / ঘটনার স্থান <span>*</span>
                  </label>
                  <input
                    type="text"
                    name="placeOfOccurrence"
                    placeholder="Enter Place of Occurrence / ঘটনার স্থান লিখুন"
                    value={values.placeOfOccurrence}
                    onChange={handleChange}
                  />
                  {errors.placeOfOccurrence && (
                    <span className="form-field__error">{errors.placeOfOccurrence}</span>
                  )}
                </div>

                <div className="form-field full-width">
                  <label>
                    3.4 Full Details of the Incident / ঘটনার সম্পূর্ণ বিবরণ <span>*</span>
                  </label>
                  <textarea
                    name="incidentDetails"
                    rows={6}
                    placeholder="Describe the incident in detail / ঘটনার সম্পূর্ণ বিবরণ লিখুন"
                    value={values.incidentDetails}
                    onChange={handleChange}
                  />
                  {errors.incidentDetails && (
                    <span className="form-field__error">{errors.incidentDetails}</span>
                  )}
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
                  অনুযায়ী সত্য ।
                </span>
              </label>

              {errors.consent && (
                <span className="form-field__error">{errors.consent}</span>
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
                  <div className="captcha-code">{captcha}</div>

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
                    onChange={handleCaptchaInputChange}
                  />
                </div>

                {captchaError && (
                  <span className="form-field__error">{captchaError}</span>
                )}
              </div>

              {status === 'error' && (
                <p className="form-card__error" role="alert">
                  Something went wrong. Please try again in a moment.
                </p>
              )}

              {/* Submit */}

              <div className="form-submit">
                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  disabled={isSubmitDisabled}
                >
                  {status === 'submitting' ? 'Submitting…' : 'Submit Complaint'}
                </Button>
              </div>
            </div>
          </form>
        </div>
      </main>
    </>
  );
}

export default RegisterForm;
