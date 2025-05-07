import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import friendsApi from '../api/friendsApi';
import { Friend, FriendsResponse } from '../types';

const FriendsPage = () => {
  const [friends, setFriends] = useState<FriendsResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchFriends = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          navigate('/login');
          return;
        }

        const response = await friendsApi.getFriends();
        setFriends(response);
      } catch (err) {
        setError('Не удалось загрузить список друзей');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchFriends();
  }, [navigate]);

  const handleRemoveFriend = async (friendId: number) => {
    try {
      await friendsApi.removeFriend(friendId);
      //setFriends(prev => prev.filter(f => f.friends !== friendId));
    } catch (error) {
      console.error('Ошибка при удалении друга:', error);
      setError('Не удалось удалить друга');
    }
  };

  if (loading) return <div>Загрузка списка друзей...</div>;
  if (error) return <div style={{ color: 'red' }}>{error}</div>;

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '20px' }}>
      <h1>Мои друзья</h1>
      <button 
        onClick={() => navigate(-1)}
        style={{ marginBottom: '20px', padding: '8px 16px' }}
      >
        Назад
      </button>

      {friends.length === 0 ? (
        <p>У вас пока нет друзей</p>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '20px' }}>
          {friends.map(friend => (
            <div 
              key={friend.friends.id}
              style={{
                border: '1px solid #e0e0e0',
                borderRadius: '8px',
                padding: '16px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '10px'
              }}
            >
              
             {/* <h3 style={{ margin: 0 }}>{friend.friends.name} {friend.friends.surname}</h3> */}
              {/* <p style={{ margin: 0, color: '#666' }}>@{friend.friends.login}</p> */}
              
              
              <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
                <button 
                  onClick={() => navigate(`/profile/${friend.friends.id}`)}
                  style={{ padding: '6px 12px' }}
                >
                  Профиль
                </button>
                <button 
                  onClick={() => handleRemoveFriend(friend.friends.id)}
                  style={{ 
                    padding: '6px 12px',
                    backgroundColor: '#ffebee',
                    color: '#c62828',
                    border: '1px solid #ef9a9a'
                  }}
                >
                  Удалить
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FriendsPage;