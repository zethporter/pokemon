import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import type { Sprites } from "@/lib/pokemon";

const Sprite = ({
  src,
  alt,
  groupName,
}: {
  src: string;
  alt: string;
  groupName: Array<string>;
}) => (
  <Card>
    <CardHeader>
      <CardTitle>{alt}</CardTitle>
    </CardHeader>
    <CardContent>
      <img src={src} alt={alt} />
    </CardContent>
    <CardFooter>
      <Breadcrumb>
        <BreadcrumbList>
          {groupName.map((name, i) => (
            <>
              <BreadcrumbItem key={i}>
                <BreadcrumbPage>{name}</BreadcrumbPage>
              </BreadcrumbItem>
              {i + 1 < groupName.length && <BreadcrumbSeparator />}
            </>
          ))}
        </BreadcrumbList>
      </Breadcrumb>
    </CardFooter>
  </Card>
);

const SpriteGroup = ({
  group,
  groupName,
}: {
  group: Record<string, string | Record<string, string> | null> | Sprites;
  groupName: Array<string>;
}) => {
  return (
    <div className="flex flex-row flex-wrap gap-2">
      {Object.entries(group).map(([key, value]) => {
        if (typeof value === "string") {
          return (
            <Sprite key={key} src={value} alt={key} groupName={groupName} />
          );
        } else if (!!value && typeof value === "object") {
          return (
            <SpriteGroup
              key={key}
              group={value}
              groupName={[...groupName, key]}
            />
          );
        }
      })}
    </div>
  );
};

export function PokemonSprites({ sprites }: { sprites: Sprites }) {
  return <SpriteGroup group={sprites} groupName={[]} />;
}
