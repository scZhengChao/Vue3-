<template>
<div>
    <div id="demo">
        Push this button to do something you shouldn't be doing:<br />
      
        <div :class="{ shake: noActivated }">
          <button @click="noActivated = true">Click me</button>
          <span v-if="noActivated">Oh no!</span>
        </div>
    </div>


    <div id="demo">
    <div
      @mousemove="xCoordinate"
      :style="{ backgroundColor: `hsl(${x}, 80%, 50%)` }"
      class="movearea"
    >
      <h3>Move your mouse across the screen...</h3>
      <p>x: {{x}}</p>
    </div>
  </div>

<div id="demo">
  <button @click="show1 = !show1">
    Toggle
  </button>

  <transition name="fade" :duration="{ enter: 2000, leave: 3000 }" appear>
    <p v-if="show1">hello</p>
  </transition>
  <button @click="show2 = !show2">
    Toggle
  </button>
  <transition name="slide-fade">
    <p v-if="show2">hello</p>
  </transition>
</div>

<div id="demo">
    <button @click="show3 = !show3">Toggle show</button>
    <transition name="bounce">
      <p v-if="show3">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris facilisis
        enim libero, at lacinia diam fermentum id. Pellentesque habitant morbi
        tristique senectus et netus.
      </p>
    </transition>
  </div>


  <div id="list-complete-demo" class="demo">
    <button @click="shuffle">Shuffle</button>
    <button @click="add">Add</button>
    <button @click="remove">Remove</button>
    <transition-group name="list-complete" tag="p">
      <span v-for="item in items" :key="item" class="list-complete-item">
        {{ item }}
      </span>
    </transition-group>
  </div>
   


    <div id="demo">
        <input v-model="query" />
        <transition-group
            name="staggered-fade"
            tag="ul"
            :css="false"
            @before-enter="beforeEnter"
            @enter="enter"
            @leave="leave"
            >
            <li
                v-for="(item, index) in computedList"
                :key="item.msg"
                :data-index="index"
                >
                {{ item.msg }}
            </li>
        </transition-group>
    </div>


    <div id="dynamic-fade-demo" class="demo">
        Fade In:
        <input type="range" v-model="fadeInDuration" min="0" :max="maxFadeDuration" />
        Fade Out:
        <input
          type="range"
          v-model="fadeOutDuration"
          min="0"
          :max="maxFadeDuration"
        />
        <transition
          :css="false"
          @before-enter="beforeEnter1"
          @enter="enter1"
          @leave="leave1"
        >
          <p v-if="show">hello</p>
        </transition>
        <button v-if="stop" @click="stop = false; show = false">
          Start animating
        </button>
        <button v-else @click="stop = true">Stop it!</button>
      </div>
      <p>1</p>
      <p>1</p>
      <p>1</p>
      <p>1</p>
      <p>1</p>
      <p>1</p>
      <p>1</p>
      <p>1</p>
      <p>1</p>
      <p>1</p>
      <p>1</p>
      <p>1</p>
      <p>1</p>
      <p>1</p>
      <p>1</p>
</div>
</template>

<script>
export default {
    name:'transition',
    data(){return{
        noActivated: false,
        x: 0,
        show1: true,
        show2: true,
        show3: true,
        items: [1, 2, 3, 4, 5, 6, 7, 8, 9],
        nextNum: 10,
        query: '',
        list: [
            { msg: 'Bruce Lee' },
            { msg: 'Jackie Chan' },
            { msg: 'Chuck Norris' },
            { msg: 'Jet Li' },
            { msg: 'Kung Fury' }
        ],
        show: true,
        fadeInDuration: 1000,
        fadeOutDuration: 1000,
        maxFadeDuration: 1500,
        stop: true
    }},
    mounted() {
        this.show = false
    },
    computed: {
        computedList() {
            var vm = this
            return this.list.filter(item => {
                return item.msg.toLowerCase().indexOf(vm.query.toLowerCase()) !== -1
            })
        }
    },
    methods: {
        xCoordinate(e) {
            this.x = e.clientX
        },
        randomIndex() {
            return Math.floor(Math.random() * this.items.length)
        },
        add() {
            this.items.splice(this.randomIndex(), 0, this.nextNum++)
        },
        remove() {
            this.items.splice(this.randomIndex(), 1)
        },
        shuffle() {
            this.items = _.shuffle(this.items)
        },
        beforeEnter(el) {
            el.style.opacity = 0
            el.style.height = 0
        },
        enter(el, done) {
            gsap.to(el, {
                opacity: 1,
                height: '1.6em',
                delay: el.dataset.index * 0.15,
                onComplete: done
            })
        },
        leave(el, done) {
            gsap.to(el, {
                opacity: 0,
                height: 0,
                delay: el.dataset.index * 0.15,
                onComplete: done
            })
        },


        beforeEnter1(el) {
            el.style.opacity = 0
        },
        enter1(el, done) {
            var vm = this
            Velocity(
                el,
                { opacity: 1 },
                {
                    duration: this.fadeInDuration,
                    complete: function() {
                        done()
                        if (!vm.stop) vm.show = false
                    }
                }
            )
        },
        leave1(el, done) {
            var vm = this
            Velocity(
                el,
                { opacity: 0 },
                {
                    duration: this.fadeOutDuration,
                    complete: function() {
                        done()
                        vm.show = true
                    }
                }
            )
        }
    }
}
</script>
<style lang='scss' scoped>
    .shake {
        animation: shake 0.82s cubic-bezier(0.36, 0.07, 0.19, 0.97) both;
        transform: translate3d(0, 0, 0);
        backface-visibility: hidden;
        perspective: 1000px;
    }

@keyframes shake {
  10%,
  90% {
    transform: translate3d(-1px, 0, 0);
  }

  20%,
  80% {
    transform: translate3d(2px, 0, 0);
  }

  30%,
  50%,
  70% {
    transform: translate3d(-4px, 0, 0);
  }

  40%,
  60% {
    transform: translate3d(4px, 0, 0);
  }
}

.movearea {
  transition: 0.2s background-color ease;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}


/* 可以设置不同的进入和离开动画   */
/* 设置持续时间和动画函数        */
.slide-fade-enter-active {
  transition: all 0.3s ease-out;
}

.slide-fade-leave-active {
  transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateX(20px);
  opacity: 0;
}


.bounce-enter-active {
  animation: bounce-in 0.5s;
}
.bounce-leave-active {
  animation: bounce-in 0.5s reverse;
}
@keyframes bounce-in {
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(1.25);
  }
  100% {
    transform: scale(1);
  }
}




.list-complete-item {
  transition: all 0.8s ease;
  display: inline-block;
  margin-right: 10px;
}

.list-complete-enter-from,
.list-complete-leave-to {
  opacity: 0;
  transform: translateY(30px);
}

.list-complete-leave-active {
  position: absolute;
}
 
</style>