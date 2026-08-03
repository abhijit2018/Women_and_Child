import { useState, FormEvent, ChangeEvent } from 'react';
import FormHeader from './FormHeader'; // adjust path to your actual FormHeader location
import '../../../styles/ComplaintStatusCheck.css';

interface StatusFormValues {
  ackNo: string;
  mobile: string;
}

interface ComplaintStatusResult {
  ackNo: string;
  complainantName: string;
  complainantNameBn: string;
  complaintType: string;
  complaintTypeBn: string;
  filedDate: string;
  currentStage: string;
  currentStageBn: string;
  currentStatus: 'Pending' | 'Under Review' | 'Resolved' | 'Rejected';
  currentStatusBn: string;
  remarks: string;
  remarksBn: string;
  lastUpdated: string;
}

const MOCK_STATUS_DB: Record<string, ComplaintStatusResult> = {
  'WB123456': {
    ackNo: 'WB123456',
    complainantName: 'Pooja Roy',
    complainantNameBn: 'পূজা রায়',
    complaintType: 'Domestic Violence',
    complaintTypeBn: 'গার্হস্থ্য হিংসা',
    filedDate: '15 Jul 2026',
    currentStage: 'Investigation in Progress',
    currentStageBn: 'তদন্ত চলছে',
    currentStatus: 'Under Review',
    currentStatusBn: 'পর্যালোচনাধীন',
    remarks: 'Assigned to local police station for verification.',
    remarksBn: 'যাচাইয়ের জন্য স্থানীয় থানায় পাঠানো হয়েছে।',
    lastUpdated: '28 Jul 2026',
  },
};

const DEMO_OTP = '123456';

type ViewState = 'form' | 'result';

function ComplaintStatusCheck() {
  const [values, setValues] = useState<StatusFormValues>({ ackNo: '', mobile: '' });
  const [errors, setErrors] = useState<Partial<StatusFormValues>>({});
  const [isOtpModalOpen, setIsOtpModalOpen] = useState(false);
  const [otp, setOtp] = useState('');
  const [otpError, setOtpError] = useState('');
  const [view, setView] = useState<ViewState>('form');
  const [result, setResult] = useState<ComplaintStatusResult | null>(null);
  const [notFoundError, setNotFoundError] = useState('');

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof StatusFormValues]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  }

  function validate(): boolean {
    const nextErrors: Partial<StatusFormValues> = {};
    if (!values.ackNo.trim()) {
      nextErrors.ackNo = 'Acknowledgement number is required. / স্বীকৃতি নম্বর আবশ্যক।';
    }
    if (!values.mobile.trim()) {
      nextErrors.mobile = 'Mobile number is required. / মোবাইল নম্বর আবশ্যক।';
    } else if (!/^[6-9]\d{9}$/.test(values.mobile.trim())) {
      nextErrors.mobile = 'Enter a valid 10-digit mobile number. / সঠিক ১০ সংখ্যার মোবাইল নম্বর লিখুন।';
    }
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  }

  function handleSearch(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setNotFoundError('');
    if (!validate()) return;

    // Static flow: pretend OTP was just sent.
    setOtp('');
    setOtpError('');
    setIsOtpModalOpen(true);
  }

  function handleVerifyOtp() {
    if (otp.trim().length !== 6) {
      setOtpError('Please enter the 6-digit OTP. / ৬ সংখ্যার OTP লিখুন।');
      return;
    }
    if (otp.trim() !== DEMO_OTP) {
      setOtpError('Incorrect OTP. Please try again. / ভুল OTP। আবার চেষ্টা করুন।');
      return;
    }

    const record = MOCK_STATUS_DB[values.ackNo.trim().toUpperCase()];
    setIsOtpModalOpen(false);

    if (!record) {
      setNotFoundError(
        'No complaint found for this acknowledgement number and mobile number. / এই নম্বরের জন্য কোনো অভিযোগ পাওয়া যায়নি।'
      );
      return;
    }

    setResult(record);
    setView('result');
  }

  function handleNewSearch() {
    setView('form');
    setResult(null);
    setValues({ ackNo: '', mobile: '' });
    setNotFoundError('');
  }

  return (
    <div className="status-check-page">
      <FormHeader formName="Complaint Status Check" />

      <div className="status-check-page__body container">
        {view === 'form' && (
          <form className="status-check-card" onSubmit={handleSearch} noValidate>
            <p className="status-check-card__intro">
  Enter your acknowledgement number and the mobile number you provided while filing the complaint.
  <br />
  <small>আপনার স্বীকৃতি নম্বর এবং অভিযোগ দাখিলের সময় যে মোবাইল নম্বরটি দিয়েছিলেন তা লিখুন।</small>
</p>

            <div className="form-field">
              <label htmlFor="ackNo">
                Acknowledgement Number / স্বীকৃতি নম্বর <span>*</span>
                <br />
                
              </label>
              <input
                id="ackNo"
                name="ackNo"
                type="text"
                value={values.ackNo}
                onChange={handleChange}
                placeholder="e.g. WB123456"
              />
              {errors.ackNo && <span className="form-field__error">{errors.ackNo}</span>}
            </div>

            <div className="form-field">
              <label htmlFor="mobile">
                Mobile Number / মোবাইল নম্বর <span>*</span>
                <br />
              </label>
              <input
                id="mobile"
                name="mobile"
                type="tel"
                maxLength={10}
                value={values.mobile}
                onChange={handleChange}
                placeholder="10-digit mobile number"
              />
              {errors.mobile && <span className="form-field__error">{errors.mobile}</span>}
            </div>

            {notFoundError && <span className="form-field__error status-check-card__not-found">{notFoundError}</span>}

            <button type="submit" className="status-check-card__submit">
              Search / সার্চ
            </button>
          </form>
        )}

        {view === 'result' && result && (
          <div className="status-result-card">
            <div className="status-result-card__header">
              <h2>Complaint Status</h2>
             <span className={`status-badge status-badge--${result.currentStatus.toLowerCase().replace(/\s+/g, '-')}`}>
  {result.currentStatus} <span className="status-badge__bn">/ {result.currentStatusBn}</span>
</span>
            </div>

            <dl className="status-result-card__grid">
  <div>
    <dt>Acknowledgement No. / <small>স্বীকৃতি নম্বর</small></dt>
    <dd>{result.ackNo}</dd>
  </div>
  <div>
    <dt>Complainant Name /<small>অভিযোগকারীর নাম</small></dt>
    <dd>{result.complainantName} <span className="status-result-card__bn">({result.complainantNameBn})</span></dd>
  </div>
  <div>
    <dt>Complaint Type /<small>অভিযোগের ধরন</small></dt>
    <dd>{result.complaintType} <span className="status-result-card__bn">({result.complaintTypeBn})</span></dd>
  </div>
  <div>
    <dt>Filed Date /<small>দাখিলের তারিখ</small></dt>
    <dd>{result.filedDate}</dd>
  </div>
  <div>
    <dt>Current Stage /<small>বর্তমান পর্যায়</small></dt>
    <dd>{result.currentStage} <span className="status-result-card__bn">({result.currentStageBn})</span></dd>
  </div>
  <div>
    <dt>Last Updated /<small>সর্বশেষ আপডেট</small></dt>
    <dd>{result.lastUpdated}</dd>
  </div>
  <div className="status-result-card__remarks">
    <dt>Remarks /<small>মন্তব্য</small></dt>
    <dd>{result.remarks} <span className="status-result-card__bn">({result.remarksBn})</span></dd>
  </div>
</dl>

            <button type="button" className="status-check-card__submit" onClick={handleNewSearch}>
              Check Another Complaint / আরেকটি অভিযোগ পরীক্ষা করুন
            </button>
          </div>
        )}
      </div>

      {isOtpModalOpen && (
        <div className="status-modal__overlay" onClick={() => setIsOtpModalOpen(false)}>
          <div className="status-modal" onClick={(e) => e.stopPropagation()} role="dialog" aria-modal="true">
            <p className="status-modal__message">
              An OTP has been sent to your registered mobile number ending in{' '}
              {values.mobile.slice(-4).padStart(values.mobile.length, '•')}.
              <br />
              <small>আপনার নিবন্ধিত মোবাইল নম্বরে একটি OTP পাঠানো হয়েছে।</small>
            </p>

            <input
              type="text"
              inputMode="numeric"
              maxLength={6}
              className="status-modal__otp-input"
              placeholder="Enter 6-digit OTP"
              value={otp}
              onChange={(e) => {
                setOtp(e.target.value.replace(/\D/g, ''));
                setOtpError('');
              }}
            />
            {otpError && <span className="form-field__error">{otpError}</span>}

            <div className="status-modal__actions">
              <button type="button" className="status-modal__close" onClick={handleVerifyOtp}>
                Verify OTP
              </button>
              <button type="button" className="status-modal__secondary" onClick={() => setIsOtpModalOpen(false)}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ComplaintStatusCheck;