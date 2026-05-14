import { Container } from '@/components/common/Container';
import { Button } from '@/components/common/Button';

export const NotFound = () => {
  return (
    <section className="grid min-h-[70vh] place-items-center py-24">
      <Container size="sm" className="text-center">
        <p className="eyebrow mb-6 justify-center">Error 404</p>
        <h1 className="font-display text-display-2xl text-bone-50 text-balance leading-[0.95]">
          The page you are looking for has been quietly retired.
        </h1>
        <p className="mx-auto mt-8 max-w-xl font-serif text-xl italic text-bone-200/80">
          Some stories drift out of print. Some links break. Either way — let us send you somewhere
          better.
        </p>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <Button as="link" to="/" size="lg">
            Back to the front page
          </Button>
          <Button as="link" to="/spotlight" variant="ghost" size="lg">
            Read Spotlight
          </Button>
        </div>
      </Container>
    </section>
  );
};

export default NotFound;
