import { useNavigate } from 'react-router-dom';

const AnotherPage = () => {
  const navigate = useNavigate();

  return (
    <div>
      <p>
        Другая страница
      </p>

      <button onClick={() => navigate(-1)}>
        Назад
      </button>
    </div>
  );
};

export { AnotherPage };
