interface Props {
  captcha: string;
  captchaInput: string;
  onCaptchaChange: (value: string) => void;
  onRefresh: () => void;
}

const CaptchaSection = ({
  captcha,
  captchaInput,
  onCaptchaChange,
  onRefresh,
}: Props) => {
  return (
    <div className="captcha-section">
      <div className="captcha-image">
        {captcha}
      </div>

      <button type="button" onClick={onRefresh}>
        Refresh
      </button>

      <input
        type="text"
        placeholder="Enter Captcha"
        value={captchaInput}
        onChange={(e) => onCaptchaChange(e.target.value)}
      />
    </div>
  );
};

export default CaptchaSection;