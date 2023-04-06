const PokemonCardShimmer = () => {
  const shimmers = [];
  for (let i = 0; i < 12; i++) {
    shimmers.push(
      <div className="w-1/3 flex-shrink-0" key={i}>
        <div className="mx-2 my-2">
          <div className="w-full h-40 bg-gray-200 rounded-lg"></div>
        </div>
      </div>
    );
  }
  return <>{shimmers}</>;
};

export default PokemonCardShimmer;
