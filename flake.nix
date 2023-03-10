{
  description = "dev flake with node";

  inputs = {
    nixpkgs.url = github:nixos/nixpkgs/nixos-unstable;
  };

  outputs = { self, nixpkgs }: 
  let 
    system = "x86_64-linux";
    pkgs = nixpkgs.legacyPackages.${system};
  in {

    packages.${system}.hello = nixpkgs.legacyPackages.${system}.hello;

    defaultPackage.${system} = self.packages.${system}.hello;

    devShells.${system}.default = with pkgs; mkShell {
      nativeBuildInputs = [
        nodejs-18_x
        nodePackages.npm
        nodePackages.typescript
        yarn
        gh
      ];

      buildInputs = [

      ];
    };
  };
}
