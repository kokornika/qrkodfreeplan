import React from 'react';
import { useNavigate } from 'react-router-dom';
import PromotionalCard from '../ui/PromotionalCard';

const BlogCTA = () => {
  const navigate = useNavigate();

  return (
    <div className="mt-12">
      <PromotionalCard
        title="Készítse el saját digitális névjegykártyáját!"
        description="Próbálja ki most digitális névjegykártya szolgáltatásunkat és tapasztalja meg a modern kapcsolatépítés előnyeit!"
        buttonText="Névjegykártya készítése"
        onClick={() => navigate('/vcard')}
        variant="secondary"
      />
    </div>
  );
};

export default BlogCTA;