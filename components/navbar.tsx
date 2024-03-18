"use client";
import {
  Navbar as NextUINavbar,
  NavbarContent,
  NavbarMenu,
  NavbarMenuToggle,
  NavbarBrand,
  NavbarItem,
  NavbarMenuItem,
} from "@nextui-org/navbar";
import { Button } from "@nextui-org/button";
import { Link } from "@nextui-org/link";
import { Input } from "@nextui-org/input";

import { link as linkStyles } from "@nextui-org/theme";

import { siteConfig } from "@/config/site";
import NextLink from "next/link";
import clsx from "clsx";

import { ThemeSwitch } from "@/components/theme-switch";
import {
  GithubIcon,
  Logo,
  WalletLoginIcon,
  SearchIcon,
  CartIcon,
} from "@/components/icons";
import { LoginPopup } from "./login-popup";
import { useState } from "react";

export const Navbar = () => {
  const [isLoginOpen, setLoginPopup] = useState(false);
  const searchInput = (
    <Input
      aria-label="Search"
      classNames={{
        inputWrapper: "bg-default-100",
        input: "text-sm xl:w-[535px] lg:w-[535px] md:[355px]",
      }}
      labelPlacement="outside"
      placeholder="Search"
      startContent={
        <SearchIcon className="text-base text-default-400 pointer-events-none flex-shrink-0" />
      }
      type="search"
    />
  );

  return (
    <NextUINavbar maxWidth="2xl" position="sticky" height="90px">
      <NavbarContent className="basis-1/5 sm:basis-full" justify="start">
        <NavbarBrand as="li" className="gap-3 max-w-fit">
          <NextLink className="flex justify-start items-center gap-1" href="/">
            <Logo />
            <p className="font-bold text-inherit">YUI</p>
          </NextLink>
        </NavbarBrand>
        <ul className="hidden lg:flex gap-5 justify-start ml-2">
          {siteConfig.navItems.map((item) => (
            <NavbarItem key={item.href}>
              <NextLink
                className={clsx(
                  linkStyles({ color: "foreground" }),
                  "data-[active=true]:text-primary data-[active=true]:font-semibold font-semibold",
                )}
                color="foreground"
                href={item.href}
              >
                {item.label}
              </NextLink>
            </NavbarItem>
          ))}
        </ul>
      </NavbarContent>

      <NavbarContent
        className="hidden sm:flex basis-1/5 sm:basis-full"
        justify="center"
      >
        <NavbarItem className="hidden lg:flex">{searchInput}</NavbarItem>
      </NavbarContent>

      <NavbarContent className="hidden sm:flex basis-1 sm:basis-full">
        <NavbarItem className="hidden md:flex">
          <Button
            isExternal
            as={Link}
            size="md"
            className="text-sm font-semibold text-default-600 bg-default-100"
            startContent={<WalletLoginIcon />}
            onPress={() => setLoginPopup(true)}
            variant="flat"
          >
            Login
          </Button>
        </NavbarItem>
        <NavbarItem className="hidden md:flex">
          <Button
            isExternal
            isIconOnly
            size="md"
            as={Link}
            className="text-sm font-normal text-default-600 bg-default-100"
            startContent={<CartIcon />}
            variant="flat"
          />
        </NavbarItem>
        <NavbarItem className="hidden sm:flex gap-2">
          <ThemeSwitch />
        </NavbarItem>
      </NavbarContent>

      <LoginPopup
        title="Log in or sign up as email"
        isOpen={isLoginOpen}
        onOpen={() => setLoginPopup(false)}
      />

      <NavbarContent className="sm:hidden basis-1 pl-4" justify="end">
        <Link isExternal href={siteConfig.links.github} aria-label="Github">
          <GithubIcon className="text-default-500" />
        </Link>
        <ThemeSwitch />
        <NavbarMenuToggle />
      </NavbarContent>

      <NavbarMenu>
        {searchInput}
        <div className="mx-4 mt-2 flex flex-col gap-2">
          {siteConfig.navMenuItems.map((item, index) => (
            <NavbarMenuItem key={`${item}-${index}`}>
              <Link
                color={
                  index === 2
                    ? "primary"
                    : index === siteConfig.navMenuItems.length - 1
                      ? "danger"
                      : "foreground"
                }
                href="#"
                size="lg"
              >
                {item.label}
              </Link>
            </NavbarMenuItem>
          ))}
        </div>
      </NavbarMenu>
    </NextUINavbar>
  );
};
