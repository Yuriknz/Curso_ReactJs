import Card from "./Card";

const CardsGrid = ({ title, items, cols = 4, onAddToCart }) => {
  const colClass = `row-cols-1 row-cols-md-${Math.max(1, Math.floor(cols / 2))} row-cols-lg-${cols}`;
  
  // Verifica se há itens para exibir
  if (!items || items.length === 0) {
    return (
      <div className="alert alert-info" role="alert">
        Nenhum produto encontrado.
      </div>
    );
  }

  return (
    <section className="mb-4">
      {title && (
        <>
          <h2>{title}</h2>
          <hr />
        </>
      )}
      <div className={`row ${colClass} g-3`}>
        {items.map((item) => (
          <Card
            key={item.id}
            image={item.image}
            title={item.title}
            description={item.description}
            price={item.price}
            onAddToCartClick={() => onAddToCart(item)}
          />
        ))}
      </div>
    </section>
  );
};

export default CardsGrid;