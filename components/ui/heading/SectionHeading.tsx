type Props = {
  line1: string;
  line2?: string;
};

export default function SectionHeading({
  line1,
  line2,
}: Props) {
  return (
    <h2
      className="
        mt-6
        font-heading
        text-4xl
        leading-tight
        text-gray-900
        md:text-5xl
        lg:text-6xl
      "
    >
      {line1}

      {line2 && (
        <>
          <br />
          {line2}
        </>
      )}
    </h2>
  );
}