type BaseUser = {
    email: string;
    name: string;
};

type FormUser = BaseUser & {
    password: string;
    nickname?: string;
};

export type { BaseUser, FormUser };
