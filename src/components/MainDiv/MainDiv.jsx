export default function MainDiv({children }) {
  return (
    <main className={`w-[100%] max-w-[900px] h-auto mx-auto relative`}>
      {children}
    </main>
  );
}
