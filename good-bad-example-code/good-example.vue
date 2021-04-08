<template>
  <div class="list-wrapper mt-5">
    <div class="list-info">
      <div class="header">
        <div class="head mb-5">
          <div>
            <div class="head-title">
              {{ list.info.name }}
            </div>
          </div>
          <div class="d-flex align-center">
            <ListMenu
              :id="list.info.id"
              :my="list.info.creator.id === user.id"
              :name="list.info.name"
              :description="list.info.description"
              :def="defaultListsNames.includes(list.info.name)"
              :is-followed="list.info.followers.me"
            />
          </div>
        </div>
      </div>
      <description-wrapper :description="listDescription"></description-wrapper>
      <div class="list-statistics mt-5">
        <div class="views">
          <svg-icon name="eye" width="18" height="18"></svg-icon>
          <span>{{ list.info.seen_count }}</span>
        </div>
        <div class="stars">
          <svg-icon name="cards" width="14" height="14"></svg-icon>
          <span>{{ list.info.events_count }} Cards</span>
        </div>
        <div class="followers">
          <svg-icon name="followers" width="18" height="18"></svg-icon>
          <span>{{ list.info.followers.count }} Followers</span>
        </div>
        <div v-if="list.info.sorting_type" class="sorttype">
          <svg-icon name="list-order" width="14" height="14"></svg-icon>
          <span>{{ Object.values(sortTypes)[list.info.sorting_type] }} </span>
        </div>
      </div>
      <v-divider class="mt-2 mb-3"></v-divider>
      <div class="search mb-3">
        <v-text-field
          v-model="search"
          hide-details
          dense
          outlined
          color="bermuda"
          placeholder="Search"
          @input="searchAndFilter()"
        ></v-text-field>
        <v-btn
          height="34"
          color="bermuda"
          depressed
          piper
          @click="show = !show"
        >
          <svg-icon color="white" name="filter" width="16" height="16" />
        </v-btn>
      </div>
      <div class="filter-wrapper">
        <FilterCards
          :sorting-type="list.info.sorting_type"
          :show="show"
          :filter-data="filterData"
          @updateFilterData="(data) => (filterData = data)"
          @newFilters="searchAndFilter($event, true)"
        />
      </div>
      <div class="list-cards mt-4">
        <slide-y-up-transition>
          <div v-show="loading" class="skeletons">
            <v-skeleton-loader
              v-for="(item, ind) in 3"
              :key="ind"
              class="skeleton mb-3"
              type="image, article"
            ></v-skeleton-loader>
          </div>
        </slide-y-up-transition>
        <slide-y-up-transition>
          <div v-if="!loading" class="cards">
            <Card
              v-for="card in list.items"
              :key="card.id + loading"
              :card="card"
              card-type="list"
              with-media
              state-path="lists"
              :listfrom="list.info.id"
              class="mb-3"
            />
            <div
              v-show="list.items.length === 0 && !loading"
              key="nocards"
              class="title nocards"
            >
              No cards
            </div>
          </div>
        </slide-y-up-transition>
      </div>
      <div v-if="list.items.length > 0" class="d-flex justify-end">
        <ScrollTop class="my-2" />
      </div>

      <v-pagination
        v-if="pagination.page_count > 1"
        :value="pagination.current_page"
        total-visible="5"
        color="black"
        circle
        class="my-5"
        :length="pagination.page_count"
        @input="changePage($event)"
      ></v-pagination>

      <div class="filter-wrapper">
        <FilterCards
          :show="true"
          :filter-data="filterData"
          duplicated-filter
          @updateFilterData="(data) => (filterData = data)"
          @newFilters="searchAndFilter($event, true)"
        />
      </div>
      <Disqus class="py-2" lang="en" />
    </div>
    <div id="listinfo">
      <affix
        id="affix"
        ref="affixinfo"
        :offset="{ top: 65, bottom: 0 }"
        relative-element-selector="#listinfo"
        class="right"
      >
        <div class="list-about">
          <div class="header">
            <div class="head mb-5">
              <div>
                <div class="head-title">
                  {{ list.info.name }}
                </div>
              </div>
              <div class="d-flex align-center">
                <ListMenu
                  :id="list.info.id"
                  :my="list.info.creator.id === user.id"
                  :name="list.info.name"
                  :description="list.info.description"
                  :def="defaultListsNames.includes(list.info.name)"
                  :is-followed="list.info.followers.me"
                />
              </div>
            </div>
          </div>
          <v-img
            cover
            aspect-ratio="1.77"
            class="list-image mb-3"
            :src="list.info.media ? list.info.media.url_1000 : defaultImg"
          />
          <v-btn
            v-if="$store.state.auth.user.id !== list.info.creator.id"
            :color="isFollowed ? 'bermuda' : 'piper'"
            depressed
            wide
            dark
            :loading="apploading"
            class="follow mb-3"
            @click="changeFollow(isFollowed, list.info.id)"
          >
            {{
              isFollowed ? 'Unsave & Unfollow List' : 'Save & Follow List'
            }}</v-btn
          >
          <v-btn
            color="white"
            depressed
            outlined
            wide
            class="showmore mb-3 bermuda--text"
            @click="showmore = !showmore"
            >{{ showmore ? 'Show less' : 'Show more' }}</v-btn
          >
          <div v-if="existenceOfMyFollowing.length > 0" class="users mb-3">
            <v-menu
              max-height="200px"
              transition="scale-transition"
              content-class="threeUsers_menu"
            >
              <template v-slot:activator="{ on, attrs }">
                <div v-bind="attrs" v-on="on">
                  <threeUsers
                    :users="existenceOfMyFollowing"
                    :size="32"
                  ></threeUsers>
                </div>
              </template>

              <div
                v-for="followingUser in existenceOfMyFollowing"
                :key="followingUser.id"
              >
                <nuxt-link :to="`/user/${followingUser.id}`">
                  <avatar :user="followingUser" size="32" sm-size="42" />
                </nuxt-link>
              </div>
            </v-menu>

            <div v-if="existenceOfMyFollowing.length === 1">
              <span class="attending-text">
                {{ existenceOfMyFollowing[0].username }} follows this list
              </span>
            </div>

            <div v-if="existenceOfMyFollowing.length > 1">
              <span class="attending-text">
                {{ existenceOfMyFollowing[0].username }}
                and {{ `+ ${existenceOfMyFollowing.length - 1}` }} user<span
                  v-if="existenceOfMyFollowing.length - 1 > 1"
                  >s</span
                >
                you know are following this list.
              </span>
            </div>
          </div>
          <div v-if="showmore" class="about-info">
            <ListMap
              class="mb-3"
              :markers="
                list.items.map((el) => {
                  return {
                    lat: el.lat,
                    lng: el.lng,
                    name: el.name,
                    rating: el.my_rating
                  }
                })
              "
            />

            <userCard :user="list.user" :user-id="list.user.id" class="mb-3">
              <template #header>
                <div class="creator mb-3 d-flex justify-space-between">
                  <span>List creator:</span>
                  <FollowButton x-small :user="list.user" />
                </div>
              </template>
            </userCard>
            <ListLink
              v-if="list.info.official_link"
              :link="list.info.official_link"
              class="mb-3"
            />

            <!-- <tags
            v-if="list.info.tags.length > 0"
            :tags="list.info.tags"
            class="tags mb-3"
          /> -->
            <v-divider class="mb-3"></v-divider>
            <div class="list-id">
              <div class="id"><span>List ID:</span> L{{ list.info.id }}</div>
              <!-- <div class="create">
                <span>List created:</span> {{ dateTimeListCreated }}
              </div> -->
            </div>
          </div>
        </div>
      </affix>
    </div>
  </div>
</template>
<script>
import { mapState, mapActions, mapGetters } from 'vuex'
import { format, parseISO } from 'date-fns'
import { fromEvent, interval } from 'rxjs'
import { debounce } from 'rxjs/operators'
import userCard from '@/components/profile/userCard'
// import tags from '@/components/cardpage/tags'
import Card from '@/components/ui/card/new-card'
import ListMenu from '@/components/listpage/list-menu'
import FilterCards from '@/components/manage/filter-cards'
import threeUsers from '@/components/profile/threeUsers'
import ListMap from '@/components/listpage/list-map'
import ListLink from '@/components/listpage/list-link'
import ScrollTop from '@/components/ui/scrollToTopBtn'
import FollowButton from '@/components/ui/card/follow-button'
import { defaultListsNames } from '@/constants/defaultListsNames'
import avatar from '@/components/profile/avatar'
import descriptionWrapper from '@/components/ui/description-wrapper'
export default {
  components: {
    userCard,
    FilterCards,
    // tags,
    Card,
    threeUsers,
    ListMenu,
    ListMap,
    ListLink,
    ScrollTop,
    FollowButton,
    descriptionWrapper,
    avatar
  },
  props: {
    list: {
      type: Object,
      default: () => {}
    }
  },
  data: () => ({
    show: false,
    search: '',
    loading: false,
    timer: null,
    filters: null,
    descheight: 12,
    filterData: [],
    showmore: false
  }),

  computed: {
    ...mapState({
      myLists: (state) => state.lists.myLists,
      pagination: (state) => state.lists.eventsPagination,
      sortTypes: (state) => state.app.settings.list_sort_types
    }),
    ...mapGetters({
      isAuthenticated: 'isAuthenticated',
      apploading: 'loading'
    }),
    isFollowed() {
      return this.list.info.followers.me
    },
    defaultListsNames() {
      return defaultListsNames
    },
    user() {
      return this.$store.state.auth.user
    },
    dateTimeListCreated() {
      return format(parseISO(this.list.info.created_at), 'D MMM, YYYY | HH:mm')
    },
    listDescription() {
      return this.list.info.description
      // return this.list.info.description.length > 720 && this.descheight === 12
      //   ? this.list.info.description.slice(0, 720) + '..'
      //   : this.list.info.description
    },
    existenceOfMyFollowing() {
      const listFollowers = this.list.info.followers.users
      const myFollowing = this.$store.state.followers.my.following
      const arrayOffFollowing = [...listFollowers, ...myFollowing]
      let existenceOfMyFollowing = {}

      existenceOfMyFollowing = arrayOffFollowing.filter(function(user) {
        return (
          existenceOfMyFollowing[user.id] ||
          !(existenceOfMyFollowing[user.id] = true)
        )
      })

      return existenceOfMyFollowing
    },
    defaultImg() {
      return require('@/assets/image-not-available.png')
    }
  },
  beforeMount() {
    const authInfo = this.$auth.$storage.getUniversal('auth0.authInfo')
    const actionName = authInfo && authInfo.actionName
    actionName === 'api_followList' &&
      this.api_followList({ id: this.list.info.id, listpage: true })
  },
  mounted() {
    this.showMoreInfo()
    fromEvent(window, 'resize')
      .pipe(debounce(() => interval(300)))
      .subscribe(() => {
        // this.affix()
        this.showMoreInfo()
      })
  },
  methods: {
    ...mapActions({
      modal: 'MODAL_STATUS',
      api_getPageListById: 'lists/api_getPageListById',
      api_followList: 'lists/api_followList',
      api_unfollowList: 'lists/api_unfollowList',
      api_searchAndFilterEventsPageList:
        'lists/api_searchAndFilterEventsPageList'
    }),
    // affix() {
    // this.$refs.affixinfo.setAffix()
    // this.$refs.affixinfo.lastState = 'affix'
    // },
    changePage(page) {
      this.loading = true
      this.api_getPageListById({
        id: parseInt(this.$route.params.id),
        full: true,
        page
      }).finally(() => (this.loading = false), this.$vuetify.goTo(0))
    },
    showMoreInfo() {
      const width = window.window.innerWidth
      if (width > 1023) this.showmore = true
    },
    async unfollow(id) {
      await this.modal({
        status: true,
        modalName: 'Unfollow',
        modalInfo: {
          action: 'api_unfollowList',
          actionValue: {
            id,
            listpage: true
          }
        }
      })
    },
    changeFollow(status, id) {
      if (!this.apploading) {
        status ? this.unfollow(id) : this.api_followList({ id, listpage: true })
      }
    },
    searchAndFilter(event, close) {
      this.loading = true
      const obj = {
        id: this.list.info.id,
        filters: {
          term: this.search
        }
      }
      if (event) obj.filters = { ...obj.filters, ...event }
      clearTimeout(this.timer)
      if (close) this.show = false
      this.timer = setTimeout(() => {
        this.api_searchAndFilterEventsPageList(obj).finally(() => {
          this.loading = false
        })
      }, 500)
    }
  }
}
</script>
<style lang="scss" scoped>
.creator {
  font-size: 14px;
  line-height: 17px;
  color: #8e8e8e;
}

.list-statistics {
  display: flex;
  font-size: 12px;
  line-height: 14px;
  color: var(--v-bermuda-base);
  @media screen and (max-width: 834px) {
    font-size: 10px;
    line-height: 12px;
    justify-content: space-between;
  }

  div {
    display: grid;
    align-items: center;
    margin-right: 40px;
    grid-template-columns: max-content auto;
    grid-column-gap: 5px;
    @media screen and (max-width: 834px) {
      margin-right: 0;
    }
  }
  .sorttype {
    span::first-letter {
      text-transform: capitalize;
    }
  }
}

.desktop {
  display: block;

  @media screen and (max-width: 834px) {
    display: none;
  }
}

.mobile {
  display: none;

  @media screen and (max-width: 834px) {
    display: block;
  }
}

.list-wrapper {
  display: grid;
  grid-template-columns: 630px 308px;
  grid-column-gap: 74px;
  justify-items: center;
  @media screen and (max-width: 1264px) {
    grid-template-columns: 501px 308px;
  }
  @media screen and (max-width: 1023px) {
    grid-template-columns: 1fr;
  }
  .right {
    width: 308px;

    @media screen and (max-width: 1023px) {
      margin-top: 20px;
      margin-left: 0;
      margin-bottom: 0px;
    }

    .showmore {
      @media screen and (min-width: 1023px) {
        display: none;
      }
    }

    .header {
      display: none;

      @media screen and (max-width: 833px) {
        display: block;
      }
    }
  }

  .list {
    &-info {
      width: 100%;
      @media screen and (max-width: 1023px) {
        order: 1;
      }
      @media screen and (max-width: 883px) {
        max-width: calc(100vw - 20px);
      }
      .header {
        @media screen and (max-width: 833px) {
          display: none;
        }

        &-buttons {
          display: grid;
          grid-template-columns: 1fr 1fr;
          width: 100%;
          justify-items: start;
          align-items: center;
          .btn {
            justify-self: end;
          }
        }
      }
      .search {
        display: grid;
        grid-template-columns: 1fr max-content;
        align-items: center;
        grid-column-gap: 10px;
        @media screen and (max-width: 1264px) {
          grid-template-columns: 1fr max-content;
        }
        @media screen and (max-width: 833px) {
          grid-template-columns: 1fr max-content;
        }
      }
      .list-cards {
        display: grid;
        grid-gap: 10px;
        width: 100%;
        grid-template-columns: minmax(100px, 1fr);
        @media screen and (max-width: 833px) {
          position: relative;
          left: -10px;
          width: 100vw;
        }
      }
    }
  }
  .head {
    display: flex;
    justify-content: space-between;
    align-items: center;

    &-title {
      font-size: 20px;
      line-height: 23px;
      font-weight: 500;

      @media screen and (max-width: 834px) {
        font-size: 18px;
        line-height: 21px;
      }
    }
  }
  .date {
    display: grid;
    grid-template-columns: 1fr max-content;
    justify-items: start;
    align-items: center;
  }
  .desc {
    color: #8e8e8e;

    /* max-width: 501px; */

    span {
      overflow-wrap: break-word;
      word-break: break-word !important;
      text-overflow: ellipsis;
      white-space: pre-wrap;
    }

    @media screen and (max-width: 1023px) {
      max-width: 883px;
    }
  }
  .soc {
    align-items: center;
    display: grid;
    grid-template-columns: max-content max-content 1fr;
    justify-items: start;
    grid-column-gap: 24px;
    font-size: 12px;
    .person {
      justify-self: end;
    }
  }
  .com {
    &-desc {
      display: block;
      @media screen and (max-width: 1023px) {
        display: none;
      }
    }
    &-mobile {
      display: none;
      width: 100%;
      @media screen and (max-width: 1024px) {
        display: block;
      }
    }
  }
}
.list-about {
  display: flex;
  flex-direction: column;
  @media screen and (max-width: 1023px) {
    /* max-width: 883px; */
    width: calc(100vw - 20px);
    /* width: calc(100vw - 20px); */
  }
  @media screen and (max-width: 884px) {
    width: calc(100vw - 20px);
  }
  .users {
    display: grid;
    grid-template-columns: max-content 1fr;
    grid-gap: 10px;
    align-items: center;

    .attending-text {
      font-size: 80%;
    }
  }
  .about-info {
    .list-id {
      font-size: 12px;
      line-height: 14px;
      display: flex;
      justify-content: space-between;
      span {
        color: grey;
      }
      .id {
        margin-right: 10px;
      }
    }
  }
}
#listinfo {
  width: 100%;
  @media screen and (max-width: 1023px) {
    order: 0;
  }
  @media screen and (max-width: 883px) {
    max-width: calc(100vw - 20px);
  }
}
.list-image {
  border-radius: 6px;
  overflow: hidden;
  width: 100%;
  height: auto;
}
.nocards {
  @media screen and (max-width: 883px) {
    padding: 0 10px;
  }
}

.threeUsers_menu {
  padding: 5px;
  display: grid;
  row-gap: 10px;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.6);
}
</style>
