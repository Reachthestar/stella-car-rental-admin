import profileImg from '../assets/images/blank.png';

export default function Avatar({ src, size = '2.5' }) {
  return (
    <div>
      <img
        src={src || profileImg}
        alt="user"
        style={{ width: `${size}rem`, height: `${size}rem` }}
        className="rounded-full"
      />
    </div>
  );
}
